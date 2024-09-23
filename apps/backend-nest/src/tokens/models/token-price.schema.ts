import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TokenPrice extends Document {
  @Prop({ required: true })
  tokenAddress: string;

  @Prop({ required: true })
  priceInAlph: number;

  @Prop({ required: true })
  timestamp: Date;
}

export const TokenPriceSchema = SchemaFactory.createForClass(TokenPrice);
