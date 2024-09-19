import { Module } from '@nestjs/common';
import { IndexerAlephiumService } from './indexer-alephium.service';
import { IndexerAlephiumController } from './indexer-alephium.controller';
import { HttpModule } from '@nestjs/axios';
import {
  BalanceHistory,
  BalanceHistorySchema,
} from './model/indexer-alephium.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: BalanceHistory.name, schema: BalanceHistorySchema },
    ]),
  ],
  controllers: [IndexerAlephiumController],
  providers: [IndexerAlephiumService],
})
export class IndexerAlephiumModule {}
