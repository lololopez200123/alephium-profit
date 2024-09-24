import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TokenDetails {
  @Prop()
  name: string;

  @Prop()
  amount: number;

  @Prop()
  amountOnAlph: number;

  @Prop()
  logo: string;

  @Prop()
  percent: number;

  @Prop()
  isFavourite: boolean;
}

export const TokenDetailsSchema = SchemaFactory.createForClass(TokenDetails);

@Schema()
export class BalanceHistory extends Document {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  timestamp: number;

  @Prop({ required: true })
  totalAmount: number;
}

export const BalanceHistorySchema =
  SchemaFactory.createForClass(BalanceHistory);

@Schema()
export class FavouriteHistory extends Document {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  tokens: TokenDetails[];

  @Prop({ required: true })
  timestamp: number;

  @Prop({ required: true })
  totalAmount: number;
}

export const FavouriteHistorySchema =
  SchemaFactory.createForClass(FavouriteHistory);
