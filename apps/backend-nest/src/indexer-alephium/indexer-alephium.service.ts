import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BalanceApiResponse,
  BalanceFavouriteHistoryEntry,
  BalanceHistoryEntry,
  BalanceResponse,
  TokenDetails,
} from './interfaces/balance';
import {
  BalanceHistory,
  FavouriteHistory,
} from './model/indexer-alephium.schema';
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
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class IndexerAlephiumService {
  private readonly baseUrl = this.configService.get('ALPH_INDEXER_API_URL');
  private readonly MOBULA_URL = this.configService.get('MOBULA_API_URL');
  private readonly MOBULA_API_KEY = this.configService.get('MOBULA_API_KEY');
  private readonly ALEPHIUM_NODE = 'https://backend.mainnet.alephium.org';
  private logger = new Logger(IndexerAlephiumService.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectModel(BalanceHistory.name)
    private balanceHistoryModel: Model<BalanceHistory>,
    @InjectModel(FavouriteHistory.name)
    private balanceFavouriteHistoryModel: Model<FavouriteHistory>,
    private tokensService: TokensService,
    private userService: UserService,
  ) {}

  /**
   * Get the user's balance next to the total history and favorites
   * @param address user address
   * @Param Skiphistoryupdate If the history update should be omitted
   * @returns Balance Response
   */
  async getMyBalance(
    address: string,
    skipHistoryUpdate: boolean = false,
  ): Promise<BalanceResponse> {
    try {
      const balance = await this.fetchBalance(address);
      if (!balance || !balance.tokens || balance.tokens.length === 0) {
        this.logger.warn(
          `getMyBalance: No balance or tokens found for address ${address}`,
        );
        return {
          totalAmount: 0,
          tokens: [],
          totalHistory: [],
          totalFavouriteHistory: [],
        };
      }
      this.logger.log('getMyBalance: Fetched balance', address, balance);

      // Obtain the listed tokens and their prices from the database
      const listedTokens = await this.tokensService.getTokens();
      const tokenAddresses = listedTokens.map((token) => token.address);

      if (!listedTokens || listedTokens.length === 0) {
        this.logger.warn('getMyBalance: No listed tokens found');
        return {
          totalAmount: 0,
          tokens: [],
          totalHistory: [],
          totalFavouriteHistory: [],
        };
      }

      // believe a map of tokens listed by direct
      const listedTokensMap = new Map<string, Token>();
      listedTokens.forEach((token) => {
        listedTokensMap.set(token.address, token);
      });

      const priceMap = await this.tokensService.getTokenPrices(tokenAddresses);

      if (!priceMap) {
        this.logger.warn('getMyBalance: No price map found');
      }

      // Process the user's balances
      let totalAmountOnAlph = new BigNumber(0);
      const tokensWithDetails: TokenDetails[] = [];

      for (const tokenBalance of balance.tokens) {
        const tokenAddress = tokenBalance.token.address;

        // Verify if the token is listed
        if (listedTokensMap.has(tokenAddress)) {
          const token = listedTokensMap.get(tokenAddress);
          let amount: BigNumber;

          if (!tokenBalance.balance || tokenBalance.balance === '0') {
            this.logger.warn(
              `getMyBalance: Invalid or zero balance for token ${tokenAddress}`,
            );
            continue; // Saltar este token
          }

          if (token.decimals !== 0) {
            amount = new BigNumber(tokenBalance.balance).dividedBy(
              new BigNumber(10).pow(token.decimals),
            );
          } else {
            amount = new BigNumber(tokenBalance.balance);
          }

          const priceInAlph = new BigNumber(priceMap.get(tokenAddress) || 0);

          if (priceInAlph.isZero()) {
            this.logger.warn(
              `getMyBalance: Price for token ${tokenAddress} is 0`,
            );
            continue; // Saltar este token si el precio es 0
          }

          const amountOnAlph = amount.multipliedBy(priceInAlph);

          totalAmountOnAlph = totalAmountOnAlph.plus(amountOnAlph);

          this.logger.log(`getMyBalance: Processed token ${token.name}`, {
            amount: amount.toString(),
            priceInAlph: priceInAlph.toString(),
            amountOnAlph: amountOnAlph.toString(),
          });

          tokensWithDetails.push({
            name: token.name,
            amount: amount.toNumber(),
            amountOnAlph: amountOnAlph.toNumber(),
            logo: token.logo,
            percent: 0, // will be calculated later
            isFavourite: false, // will be calculated later
          });
        }
      }

      // Calculate the percentage for each token
      tokensWithDetails.forEach((token) => {
        const amountOnAlph = new BigNumber(token.amountOnAlph);
        token.percent = totalAmountOnAlph.isZero()
          ? 0
          : amountOnAlph
              .dividedBy(totalAmountOnAlph)
              .multipliedBy(100)
              .toNumber();
      });

      // Get the user's favorite tokens
      const favouriteTokens = await this.userService.getFavoriteCoins(address);
      tokensWithDetails.forEach((token) => {
        token.isFavourite = favouriteTokens.includes(token.name);
      });

      // Build the initial answer
      const response: BalanceResponse = {
        totalAmount: totalAmountOnAlph.toNumber(),
        tokens: tokensWithDetails,
        totalHistory: [], // will be filled later
        totalFavouriteHistory: [], // will be filled later
      };

      if (!skipHistoryUpdate) {
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

        const shouldUpdateFavouriteHistory =
          await this.shouldUpdateFavouriteHistory(address);

        if (shouldUpdateFavouriteHistory) {
          await this.updateFavouriteBalanceHistory(
            address,
            tokensWithDetails,
            totalAmountOnAlph.toNumber(),
          );
        }
      }

      // Obtener el historial
      const history = await this.getBalanceHistory(address);
      const favouriteHistory = await this.getBalanceFavouritesHistory(address);
      response.totalHistory = history;
      response.totalFavouriteHistory = favouriteHistory;

      return response;
    } catch (error) {
      this.logger.error('getMyBalance: Error', error);
    }
  }

  /**
   * Verify if at least 30 minutes have passed since the last update of the history.
   * @param address user address
   * @returns Boolean indicating whether the record should be updated
   */
  private async shouldUpdateHistory(address: string): Promise<boolean> {
    const lastEntry = await this.balanceHistoryModel
      .findOne({ address })
      .sort({ timestamp: -1 })
      .exec();

    if (!lastEntry) {
      // Si no hay entradas previas, se debe actualizar el historial
      return true;
    }

    return false;
  }

  private async shouldUpdateFavouriteHistory(
    address: string,
  ): Promise<boolean> {
    const lastEntry = await this.balanceFavouriteHistoryModel
      .findOne({ address })
      .sort({ timestamp: -1 })
      .exec();
    if (!lastEntry) {
      // Si no hay entradas previas, se debe actualizar el historial
      return true;
    }
    return false;
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
          headers: { Authorization: this.MOBULA_API_KEY },
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
    return response;
  }

  /**
   * Update the user's balance history.
   * @param address
   * @param tokens
   * @param totalAmount
   */
  async updateBalanceHistory(
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

    const totalEntries = await this.balanceHistoryModel.countDocuments({
      address,
    });
    const MAX_ENTRIES = 32;

    if (totalEntries > MAX_ENTRIES) {
      const entriesToDelete = await this.balanceHistoryModel
        .find({ address })
        .sort({ timestamp: 1 })
        .limit(totalEntries - MAX_ENTRIES)
        .exec();

      await this.balanceHistoryModel.deleteMany({
        _id: { $in: entriesToDelete.map((e) => e._id) },
      });
    }
  }

  /**
   * Update the user's favorite balance history.
   * @param address
   * @param tokens
   * @param totalAmount
   */
  async updateFavouriteBalanceHistory(
    address: string,
    tokens: TokenDetails[],
    totalAmount: number,
  ) {
    const tokenFavourites = tokens.filter((token) => token.isFavourite);

    if (tokenFavourites.length === 0) {
      console.log(
        `There are no favorite tokens to update. for wallet ${address}`,
      );
      return;
    }

    const newFavouriteBalanceHistory = new this.balanceFavouriteHistoryModel({
      address,
      timestamp: Date.now(),
      totalAmount,
      tokens: tokenFavourites,
    });

    try {
      await newFavouriteBalanceHistory.save();
      console.log(
        'FavouriteBalanceHistory guardado exitosamente:',
        newFavouriteBalanceHistory,
      );
    } catch (error) {
      console.error('Error al guardar BalanceHistory:', error);
      throw error;
    }

    const totalEntries = await this.balanceHistoryModel.countDocuments({
      address,
    });
    const MAX_ENTRIES = 256;

    if (totalEntries > MAX_ENTRIES) {
      const entriesToDelete = await this.balanceHistoryModel
        .find({ address })
        .sort({ timestamp: 1 }) // older entries first
        .limit(totalEntries - MAX_ENTRIES)
        .exec();

      await this.balanceHistoryModel.deleteMany({
        _id: { $in: entriesToDelete.map((e) => e._id) },
      });
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_9PM, {
    name: 'automaticUpdateAllUsersBalanceHistory',
    timeZone: 'America/Argentina/Buenos_Aires',
  })
  async automaticUpdateAllUsersBalanceHistory() {
    const users = await this.userService.findAllUsers();

    for (const user of users) {
      const address = user.address;
      const balanceResponse = await this.getMyBalance(address, true);
      const { tokens, totalAmount } = balanceResponse;
      await this.updateBalanceHistory(address, tokens, totalAmount);
    }
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'automaticUpdateAllUsersFavouriteBalanceHistory',
    timeZone: 'America/Argentina/Buenos_Aires',
  })
  async automaticUpdateAllUsersFavouriteBalanceHistory() {
    const users = await this.userService.findAllUsers();

    for (const user of users) {
      const address = user.address;

      // Obtain the user's balance without updating the history within Getmybalance
      const balanceResponse = await this.getMyBalance(address, true);
      const { tokens, totalAmount } = balanceResponse;

      // Update the user's favorite history
      await this.updateFavouriteBalanceHistory(address, tokens, totalAmount);
    }
  }

  private async getBalanceHistory(
    address: string,
  ): Promise<BalanceHistoryEntry[]> {
    const historyEntries = await this.balanceHistoryModel
      .find({ address })
      .sort({ timestamp: -1 })
      .exec();

    return historyEntries.map((entry) => ({
      address: entry.address,
      timestamp: entry.timestamp,
      totalAmount: entry.totalAmount,
    }));
  }

  private async getBalanceFavouritesHistory(
    address: string,
  ): Promise<BalanceFavouriteHistoryEntry[]> {
    const favouriteHistoryEntries = await this.balanceFavouriteHistoryModel
      .find({ address })
      .sort({ timestamp: -1 })
      .exec();

    return favouriteHistoryEntries.map((entry) => ({
      address: entry.address,
      timestamp: entry.timestamp,
      totalAmount: entry.totalAmount,
      tokens: entry.tokens,
    }));
  }
}
