import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { IndexerAlephiumService } from './indexer-alephium.service';
import { UserService } from 'src/users/users.service';
import { RequestWithUser } from 'src/users/interfaces/user.interface';
import { GetPricesDto } from './dto/get-prices.dto';

@Controller('indexer-alephium')
export class IndexerAlephiumController {
  constructor(
    private readonly indexerAlephiumService: IndexerAlephiumService,
    private readonly userService: UserService,
  ) {}

  @Get('my-balance')
  async getMyBalance(@Query('address') address: string) {
    return this.indexerAlephiumService.getMyBalance(address);
  }

  @Get('get-crypto-info')
  async getCryptoInfo(@Query('coin') coinName: string) {
    return this.indexerAlephiumService.getCryptoMarketInfo(coinName);
  }

  @Post('get-crypto-info-batch')
  async getMarketInfoBatch(@Body('assets') assets: string[]) {
    try {
      if (!assets || assets.length === 0) {
        throw new HttpException(
          'Assets array is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const marketInfo =
        await this.indexerAlephiumService.getCryptoMarketInfoBatch(assets);
      return marketInfo;
    } catch (error) {
      throw new HttpException(
        'Error fetching market data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-popular-coins-info')
  async getMostPopularCoinsInfo() {
    const assets = ['Alephium', 'Ayin', 'Bitcoin', 'Alphpad', 'Ethereum'];
    return this.indexerAlephiumService.getCryptoMarketInfoBatch(assets);
  }

  @Post('obtain-prices')
  async getPrices(@Body() getPricesDto: GetPricesDto) {
    const { assets } = getPricesDto;

    try {
      const prices = await this.indexerAlephiumService.getPrices(assets);
      return prices;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('favorite-coins-info')
  async getFavoriteCoinsInfo(@Req() req: RequestWithUser) {
    const address = req.user['address'];
    const favoriteCoins = await this.userService.getFavoriteCoins(address);
    if (!favoriteCoins || favoriteCoins.length === 0) {
      throw new HttpException(
        'You have no favorite coins',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.indexerAlephiumService.getCryptoMarketInfoBatch(favoriteCoins);
  }
}
