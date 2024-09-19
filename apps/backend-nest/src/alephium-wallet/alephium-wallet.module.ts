import { Module } from '@nestjs/common';
import { AlephiumWalletController } from './alephium-wallet.controller';
import { AlephiumWalletService } from './alephium-wallet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: User }])],
  controllers: [AlephiumWalletController],
  providers: [AlephiumWalletService, UserService],
})
export class AlephiumWalletModule {}
