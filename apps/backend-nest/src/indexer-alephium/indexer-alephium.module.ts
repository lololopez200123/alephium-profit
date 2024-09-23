import { Module } from '@nestjs/common';
import { IndexerAlephiumService } from './indexer-alephium.service';
import { IndexerAlephiumController } from './indexer-alephium.controller';
import { HttpModule } from '@nestjs/axios';
import {
  BalanceHistory,
  BalanceHistorySchema,
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
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: BalanceHistory.name, schema: BalanceHistorySchema },
    ]),
    ScheduleModule.forRoot(),
    TokensModule,
  ],
  controllers: [IndexerAlephiumController],
  providers: [IndexerAlephiumService],
})
export class IndexerAlephiumModule {}
