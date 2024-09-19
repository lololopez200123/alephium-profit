import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './models/user.model';
import { AlephiumWalletModule } from 'src/alephium-wallet/alephium-wallet.module';
import { AlephiumWalletService } from 'src/alephium-wallet/alephium-wallet.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AlephiumWalletModule,
  ],
  controllers: [UserController],
  providers: [UserService, AlephiumWalletService],
  exports: [UserService],
})
export class UsersModule {}
