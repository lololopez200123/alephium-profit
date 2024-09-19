import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto, GenerateNonceDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('nonce')
  async generateNonce(@Body() generateNonceDto: GenerateNonceDto) {
    return this.authService.generateNonce(generateNonceDto);
  }

  @Post('credentials')
  async getCredentials(@Body() credentialsDto: CredentialsDto) {
    return this.authService.getCredentials(credentialsDto);
  }
}
