import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AlephiumWalletService } from './alephium-wallet.service';
import { AdminAccess } from 'src/decorators/admin.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-guard.guard';
import { RolesGuard } from 'src/guards/roles-guard.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('alephium-wallet')
export class AlephiumWalletController {
  constructor(private readonly alephiumWalletService: AlephiumWalletService) {}

  @AdminAccess()
  @Get('verify-token-id-in-wallet')
  async verifyTokenIdInWallet(
    @Query('tokenId') tokenId: string,
    @Query('address') address: string,
  ) {
    return this.alephiumWalletService.verifyTokenIdIsInWallet(tokenId, address);
  }

  @Get('get-ans')
  async getANSWithAddress(@Query('address') address: string) {
    return this.alephiumWalletService.getANSFromAddress(address);
  }
}
