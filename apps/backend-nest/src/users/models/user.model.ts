import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLES } from 'src/constants/roles';

@Schema()
export class User extends Document {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  email?: string;

  @Prop({ required: true, unique: true, index: true })
  address: string;

  @Prop({ required: true })
  nonce: string;

  @Prop({ required: true })
  publicKey: string;

  @Prop({ required: true, default: ROLES.BASIC })
  roleUser: string;

  @Prop({ required: false })
  isAnsSeted: boolean;

  @Prop({ type: [String], default: [] })
  favoriteCoins: string[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
