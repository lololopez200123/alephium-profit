import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BalanceApiResponse,
  BalanceHistoryEntry,
  BalanceResponse,
} from './dto/balance.dto';
import { BalanceHistory } from './model/indexer-alephium.schema';
import { ConfigService } from '@nestjs/config';
import {
  CoinListItem,
  MobulaData,
  MobulaResponse,
} from './interfaces/coinList';

@Injectable()
export class IndexerAlephiumService {
  private readonly baseUrl = 'https://indexer.alph.pro/api';
  private readonly MOBULA_URL = 'https://api.mobula.io/api/1';
  private readonly MOBULA_API_KEY = this.configService.get('MOBULA_API_KEY');
  private readonly ALEPHIUM_NODE = 'https://backend.mainnet.alephium.org';

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectModel(BalanceHistory.name)
    private balanceHistoryModel: Model<BalanceHistory>,
  ) {}

  async getMyBalance(address: string): Promise<BalanceResponse> {
    const currentTime = Date.now();
    const lastEntry = await this.balanceHistoryModel
      .findOne({ address })
      .sort({ timestamp: -1 })
      .exec();

    if (lastEntry && currentTime - lastEntry.timestamp < 3600000) {
      const history = await this.getBalanceHistory(address);
      return {
        currentBalance: {
          tokens: lastEntry.tokens,
        },
        history,
      };
    }

    const balance = await this.fetchBalance(address);
    await this.updateBalanceHistory(address, balance);

    const history = await this.getBalanceHistory(address);
    return {
      currentBalance: balance,
      history,
    };
  }

  async getCryptoMarketInfo(nameCrypto: string) {
    const url = `${this.MOBULA_URL}/market/data?asset=${nameCrypto}`;

    return firstValueFrom(
      this.httpService
        .get<MobulaResponse>(url, {
          headers: { 'x-api-key': this.MOBULA_API_KEY },
        })
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            console.error('Error fetching coin market info:', error);
            throw error;
          }),
        ),
    );
  }

  async getCryptoMarketInfoBatch(assets: string[]): Promise<CoinListItem[]> {
    function createCoinList(
      data: MobulaData[],
      alephiumPrice: number,
    ): CoinListItem[] {
      return data.map((coinData) => ({
        logo: coinData.logo,
        name: coinData.name,
        priceChange: coinData.price_change_24h,
        price: coinData.price,
        amount: coinData.price / alephiumPrice,
      }));
    }

    const assetsParam = assets.join('%2C');
    const url = `${this.MOBULA_URL}/market/multi-data?assets=${assetsParam}`;

    // Primero obtén los datos del mercado
    const dataResponse = await firstValueFrom(
      this.httpService
        .get<MobulaResponse>(url, {
          headers: { 'x-api-key': this.MOBULA_API_KEY },
        })
        .pipe(
          map((response) => response.data.data), // Accede correctamente a la propiedad 'data'
          catchError((error) => {
            console.error('Error fetching coin market info:', error);
            throw error;
          }),
        ),
    );

    // Convierte el objeto en un arreglo
    const dataArray = Object.values(dataResponse) as MobulaData[];

    const alephiumData = dataArray.find(
      (coin) => coin.name.toLowerCase() === 'alephium',
    );
    if (!alephiumData) {
      throw new Error('Alephium data not found');
    }

    const alephiumPrice = alephiumData.price;

    return createCoinList(dataArray, alephiumPrice);
  }

  async getPrices(assets: string[]): Promise<{ [key: string]: number }> {
    if (!assets || assets.length === 0) {
      throw new Error('Assets array should not be empty');
    }

    console.log(assets);

    const path = '/market/prices';
    const queryParams = '?currency=usd';
    const url = `${this.ALEPHIUM_NODE}${path}${queryParams}`;

    try {
      const response = await firstValueFrom(
        this.httpService.post<{ [key: string]: number }>(url, assets, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Error obtaining prices:', error);
      throw new Error(
        'Prices could not be obtained.Please try it again later.',
      );
    }
  }

  private async fetchBalance(address: string): Promise<BalanceApiResponse> {
    const url = `${this.baseUrl}/v2/balances?address=${address}`;
    const response = await firstValueFrom(
      this.httpService.get<BalanceApiResponse>(url).pipe(
        map((response) => {
          return { tokens: response.data.tokens };
        }),
        catchError((error) => {
          console.error('Error fetching balance:', error);
          throw error;
        }),
      ),
    );
    console.log('Fetched balance:', response);
    return response;
  }

  private async updateBalanceHistory(
    address: string,
    balance: BalanceApiResponse,
  ) {
    const newBalanceHistory = new this.balanceHistoryModel({
      address,
      timestamp: Date.now(),
      tokens: balance.tokens,
    });

    try {
      await newBalanceHistory.save();
      console.log('BalanceHistory guardado exitosamente:', newBalanceHistory);
    } catch (error) {
      console.error('Error al guardar BalanceHistory:', error);
      throw error;
    }

    // Mantener solo las últimas 16 entradas
    const totalEntries = await this.balanceHistoryModel.countDocuments({
      address,
    });
    const MAX_ENTRIES = 16;

    if (totalEntries > MAX_ENTRIES) {
      const entriesToDelete = await this.balanceHistoryModel
        .find({ address })
        .sort({ timestamp: 1 }) // Entradas más antiguas primero
        .limit(totalEntries - MAX_ENTRIES)
        .exec();

      await this.balanceHistoryModel.deleteMany({
        _id: { $in: entriesToDelete.map((e) => e._id) },
      });
    }
  }

  private async getBalanceHistory(
    address: string,
  ): Promise<BalanceHistoryEntry[]> {
    const historyEntries = await this.balanceHistoryModel
      .find({ address })
      .sort({ timestamp: 1 }) // Orden ascendente
      .limit(8)
      .exec();

    return historyEntries.map((entry) => ({
      address: entry.address,
      timestamp: entry.timestamp,
      tokens: entry.tokens,
    }));
  }
}
