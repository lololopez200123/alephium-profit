import { Module } from '@nestjs/common';
import { IndexerAlephiumService } from './indexer-alephium.service';
import { IndexerAlephiumController } from './indexer-alephium.controller';
import { HttpModule } from '@nestjs/axios';
import {
  BalanceHistory,
  BalanceHistorySchema,
  FavouriteHistory,
  FavouriteHistorySchema,
} from './model/indexer-alephium.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/models/user.model';
import { UsersModule } from 'src/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    TokensModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: BalanceHistory.name, schema: BalanceHistorySchema },
      { name: FavouriteHistory.name, schema: FavouriteHistorySchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [IndexerAlephiumController],
  providers: [IndexerAlephiumService],
  exports: [IndexerAlephiumService],
})
export class IndexerAlephiumModule {}
