// import { EventEmitter2 } from '@nestjs/event-emitter';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto, GenerateNonceDto } from './dto/register-auth.dto';

import { verifySignedMessage } from '@alephium/web3';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    // private readonly eventEmitter: EventEmitter2,
    private readonly userService: UserService,
  ) {}

  public async generateNonce({ address, publicKey }: GenerateNonceDto) {
    const nonce = crypto.getRandomValues(new Uint8Array(16)).join('');
    const name = 'User';
    const objectData = {
      name,
      address,
      publicKey,
      nonce,
    };
    // find user if this not exist create
    const findUser = await this.userService.findUserByAddress(address);
    if (findUser === null) {
      this.logger.log(`User not exists: ${address} so create`);
      await this.userService.createUser(objectData);
    }
    return {
      message: `Alephium Profit wants you to sign in with your Alephium account:\n${address}\n\nURI: https://alephium-profit.com\nVersion: 1\nNonce: ${nonce}\nIssued At: ${new Date()}`,
    };
  }

  async getCredentials(credentialsDto: CredentialsDto) {
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
