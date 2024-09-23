import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Token extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  decimals: number;

  @Prop({ required: true })
  totalSupply: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
