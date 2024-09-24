// import { EventEmitter2 } from '@nestjs/event-emitter';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto, GenerateNonceDto } from './dto/register-auth.dto';

import { verifySignedMessage, isValidAddress } from '@alephium/web3';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    // private readonly eventEmitter: EventEmitter2,
    private readonly userService: UserService,
  ) {}

  public async generateJWT({ address, publicKey }: GenerateNonceDto) {
    const nonce = crypto.getRandomValues(new Uint8Array(16)).join('');
    const name = `User-${address}`;
    const objectData = {
      name,
      address,
      publicKey,
      nonce,
    };
    // find user if this not exist create
    const verifyAdress = isValidAddress(address);
    if (!verifyAdress) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
    const findUser = await this.userService.findUserByAddress(address);
    if (findUser === null) {
      this.logger.log(`User not exists: ${address} so create`);
      await this.userService.createUser(objectData);
    }
    return {
      jwt: this.jwtService.sign({ address }, { expiresIn: '1d' }),
    };
  }

  async getCredentials(credentialsDto: CredentialsDto) {
    // TODO: deprecated function - review
    const { address, publicKey, signature, message } = credentialsDto;
    const verifiedMessage = verifySignedMessage(
      message,
      'alephium',
      publicKey,
      signature,
    );
    if (verifiedMessage) {
      return {
        jwt: this.jwtService.sign({ address }, { expiresIn: '1d' }),
      };
    }
    throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
  }
}
