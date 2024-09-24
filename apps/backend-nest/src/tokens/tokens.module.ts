import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './models/token.schema';
import { TokenPrice, TokenPriceSchema } from './models/token-price.schema';
import { HttpModule } from '@nestjs/axios';
import { IndexerAlephiumModule } from 'src/indexer-alephium/indexer-alephium.module';
import { IndexerAlephiumService } from 'src/indexer-alephium/indexer-alephium.service';
import {
  BalanceHistory,
  BalanceHistorySchema,
  FavouriteHistory,
  FavouriteHistorySchema,
} from 'src/indexer-alephium/model/indexer-alephium.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => IndexerAlephiumModule),
    UsersModule,
    HttpModule,
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: TokenPrice.name, schema: TokenPriceSchema },
      { name: BalanceHistory.name, schema: BalanceHistorySchema },
      { name: FavouriteHistory.name, schema: FavouriteHistorySchema },
    ]),
  ],
  providers: [TokensService, IndexerAlephiumService],
  exports: [TokensService],
})
export class TokensModule {}
