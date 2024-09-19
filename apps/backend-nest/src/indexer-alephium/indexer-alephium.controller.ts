import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { IndexerAlephiumService } from './indexer-alephium.service';

@Controller('indexer-alephium')
export class IndexerAlephiumController {
  constructor(
    private readonly indexerAlephiumService: IndexerAlephiumService,
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
}
