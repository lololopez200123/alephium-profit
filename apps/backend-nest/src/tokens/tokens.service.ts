// src/tokens/tokens.service.ts

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import BigNumber from 'bignumber.js';
import { Token } from './models/token.schema';
import { TokenPrice } from './models/token-price.schema';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TokensService {
  private readonly baseUrl = 'https://indexer.alph.pro/api';

  constructor(
    private httpService: HttpService,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    @InjectModel(TokenPrice.name) private tokenPriceModel: Model<TokenPrice>,
  ) {}

  // Método para obtener y almacenar tokens y precios
  @Cron(CronExpression.EVERY_DAY_AT_3AM) // Ejecutar todos los días a medianoche
  async updateTokensAndPrices() {
    console.log('Actualizando tokens y precios...');
    await this.updateTokens();
    await this.updateTokenPrices();
  }

  // Obtener y guardar tokens listados
  private async updateTokens() {
    const url = `${this.baseUrl}/tokens`;
    const response = await this.httpService.get(url).toPromise();
    const tokens = response.data.tokens;

    // Filtrar tokens listados
    const listedTokens = tokens.filter((token) => token.listed);

    // Limpiar la colección de tokens antes de guardar los nuevos
    await this.tokenModel.deleteMany({}).exec();

    // Guardar tokens en la base de datos
    await this.tokenModel.insertMany(listedTokens);
  }

  // Obtener y guardar precios de tokens
  private async updateTokenPrices() {
    const tokens = await this.tokenModel.find().exec();

    // Obtener precios para cada token
    for (const token of tokens) {
      const url = `${this.baseUrl}/prices?address=${token.address}`;
      const response = await this.httpService.get(url).toPromise();

      if (response.data.prices && response.data.prices.length > 0) {
        const priceData = response.data.prices[0];
        const price = new BigNumber(priceData.price).dividedBy(
          new BigNumber(10).pow(priceData.token.decimals),
        );

        // Crear o actualizar el precio del token
        await this.tokenPriceModel.findOneAndUpdate(
          { tokenAddress: token.address },
          {
            tokenAddress: token.address,
            priceInAlph: price.toNumber(),
            timestamp: new Date(),
          },
          { upsert: true, new: true },
        );
      }
    }
  }

  // Método para obtener tokens listados desde la base de datos
  async getTokens(): Promise<Token[]> {
    return this.tokenModel.find().exec();
  }

  // Método para obtener el precio de un token
  async getTokenPrice(tokenAddress: string): Promise<number> {
    const tokenPrice = await this.tokenPriceModel
      .findOne({ tokenAddress })
      .exec();
    return tokenPrice ? tokenPrice.priceInAlph : 0;
  }

  // Método para obtener precios de varios tokens
  async getTokenPrices(tokenAddresses: string[]): Promise<Map<string, number>> {
    const tokenPrices = await this.tokenPriceModel
      .find({ tokenAddress: { $in: tokenAddresses } })
      .exec();

    const priceMap = new Map<string, number>();
    tokenPrices.forEach((tokenPrice) => {
      priceMap.set(tokenPrice.tokenAddress, tokenPrice.priceInAlph);
    });

    return priceMap;
  }
}
