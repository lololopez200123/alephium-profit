import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Token {
  @Prop()
  address: string;

  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  decimals: number;

  @Prop()
  totalSupply: string;

  @Prop()
  listed: boolean;

  @Prop()
  description: string;

  @Prop()
  logo: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

@Schema()
export class TokenBalance {
  @Prop()
  userAddress: string;

  @Prop()
  balance: string;

  @Prop({ type: TokenSchema })
  token: Token;
}

export const TokenBalanceSchema = SchemaFactory.createForClass(TokenBalance);

@Schema()
export class BalanceHistory extends Document {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  timestamp: number;

  @Prop({ type: [TokenBalanceSchema], default: [] })
  tokens: TokenBalance[];
}

export const BalanceHistorySchema =
  SchemaFactory.createForClass(BalanceHistory);
