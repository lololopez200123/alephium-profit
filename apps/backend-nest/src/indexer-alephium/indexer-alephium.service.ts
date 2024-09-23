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
  TokenDetails,
} from './interfaces/balance';
import { BalanceHistory } from './model/indexer-alephium.schema';
import { ConfigService } from '@nestjs/config';
import {
  CoinListItem,
  MobulaData,
  MobulaResponse,
} from './interfaces/coinList';
import { TokensService } from 'src/tokens/tokens.service';
import { UserService } from 'src/users/users.service';
import BigNumber from 'bignumber.js';
import { Token } from 'src/tokens/models/token.schema';

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
    private tokensService: TokensService, // Añade el TokensService
    private userService: UserService, // Añade el UserService si no está ya
  ) {}

  async getMyBalance(address: string): Promise<BalanceResponse> {
    // Obtener el balance actual del usuario
    const balance = await this.fetchBalance(address);
    // const DECIMALS_ALPH = 18;

    // Obtener los tokens listados y sus precios desde la base de datos
    const listedTokens = await this.tokensService.getTokens();
    const tokenAddresses = listedTokens.map((token) => token.address);

    // Crear un mapa de tokens listados por dirección
    const listedTokensMap = new Map<string, Token>();
    listedTokens.forEach((token) => {
      listedTokensMap.set(token.address, token);
    });

    // Obtener los precios de los tokens
    const priceMap = await this.tokensService.getTokenPrices(tokenAddresses);

    // Procesar los balances del usuario
    let totalAmountOnAlph = new BigNumber(0);
    const tokensWithDetails: TokenDetails[] = [];

    for (const tokenBalance of balance.tokens) {
      const tokenAddress = tokenBalance.token.address;

      // Verificar si el token está listado
      if (listedTokensMap.has(tokenAddress)) {
        const token = listedTokensMap.get(tokenAddress);

        const amount = new BigNumber(tokenBalance.balance).dividedBy(
          new BigNumber(10).pow(token.decimals),
        );

        const priceInAlph = new BigNumber(priceMap.get(tokenAddress) || 0);

        const amountOnAlph = amount.multipliedBy(priceInAlph);

        totalAmountOnAlph = totalAmountOnAlph.plus(amountOnAlph);

        tokensWithDetails.push({
          name: token.name,
          amount: amount.toNumber(),
          amountOnAlph: amountOnAlph.toNumber(),
          logo: token.logo,
          percent: 0, // Se calculará después
          isFavourite: false, // Se actualizará después
        });
      }
    }

    // Calcular el porcentaje para cada token
    tokensWithDetails.forEach((token) => {
      const amountOnAlph = new BigNumber(token.amountOnAlph);
      token.percent = totalAmountOnAlph.isZero()
        ? 0
        : amountOnAlph
            .dividedBy(totalAmountOnAlph)
            .multipliedBy(100)
            .toNumber();
    });

    // Obtener los tokens favoritos del usuario
    const favouriteTokens = await this.userService.getFavoriteCoins(address);
    tokensWithDetails.forEach((token) => {
      token.isFavourite = favouriteTokens.includes(token.name);
    });

    // Construir la respuesta inicial
    const response: BalanceResponse = {
      totalAmount: totalAmountOnAlph.toNumber(),
      tokens: tokensWithDetails,
      totalHistory: [], // Se llenará más adelante
    };

    // Verificar si se debe actualizar el historial (solo si han pasado 30 minutos)
    const shouldUpdateHistory = await this.shouldUpdateHistory(address);

    if (shouldUpdateHistory) {
      // Actualizar el historial
      await this.updateBalanceHistory(
        address,
        tokensWithDetails,
        totalAmountOnAlph.toNumber(),
      );
    }

    // Obtener el historial
    const history = await this.getBalanceHistory(address);
    response.totalHistory = history;

    return response;
  }

  /**
   * Verifica si han pasado al menos 30 minutos desde la última actualización del historial.
   * @param address Dirección del usuario
   * @returns Booleano indicando si se debe actualizar el historial
   */
  private async shouldUpdateHistory(address: string): Promise<boolean> {
    const thirtyMinutesInMs = 30 * 60 * 1000;
    const lastEntry = await this.balanceHistoryModel
      .findOne({ address })
      .sort({ timestamp: -1 })
      .exec();

    if (!lastEntry) {
      // Si no hay entradas previas, se debe actualizar el historial
      return true;
    }

    const currentTime = Date.now();
    const lastTimestamp = lastEntry.timestamp;

    return currentTime - lastTimestamp >= thirtyMinutesInMs;
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

  /**
   * Actualiza el historial de balance del usuario.
   * @param address Dirección del usuario
   * @param tokens Detalles de los tokens
   * @param totalAmount Valor total en Alephium
   */
  private async updateBalanceHistory(
    address: string,
    tokens: TokenDetails[],
    totalAmount: number,
  ) {
    const newBalanceHistory = new this.balanceHistoryModel({
      address,
      timestamp: Date.now(),
      totalAmount,
      tokens,
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
      .sort({ timestamp: 1 })
      .limit(8)
      .exec();

    return historyEntries.map((entry) => ({
      address: entry.address,
      timestamp: entry.timestamp,
      totalAmount: entry.totalAmount,
      tokens: entry.tokens,
    }));
  }
}
