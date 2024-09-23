import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './models/token.schema';
import { TokenPrice, TokenPriceSchema } from './models/token-price.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: TokenPrice.name, schema: TokenPriceSchema },
    ]),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
