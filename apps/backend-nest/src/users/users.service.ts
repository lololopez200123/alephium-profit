import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

type UserDocument = User & Document;

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserData: CreateUserDto): Promise<User> {
    // first verify if exist
    const user = await this.userModel
      .findOne({ address: createUserData.address })
      .exec();
    if (user) {
      this.logger.log(`User already exists: ${user.address}`);
      throw new BadRequestException('User already exists');
    }
    try {
      const createdUser = new this.userModel(createUserData);
      const resp = await createdUser.save();

      this.logger.log(`User created: ${resp}`);

      return resp;
    } catch (error) {
      throw new HttpException('Error creating user', 500);
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      throw new Error('Error finding users');
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return this.userModel.findById(id).exec();
    } catch (error) {
      throw new Error('Error finding user');
    }
  }

  async findUserByAddress(address: string): Promise<User> {
    const user = await this.userModel.findOne({
      address,
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async addFavoriteCoin(address: string, coin: string): Promise<User> {
    const user = await this.userModel.findOne({ address }).exec();
    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    if (!user.favoriteCoins.includes(coin)) {
      user.favoriteCoins.push(coin);
      await user.save();
    }
    return user;
  }

  async removeFavoriteCoin(address: string, coin: string): Promise<User> {
    const user = await this.userModel.findOne({ address }).exec();
    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    user.favoriteCoins = user.favoriteCoins.filter((c) => c !== coin);
    await user.save();
    return user;
  }

  async getFavoriteCoins(address: string): Promise<string[]> {
    const user = await this.userModel.findOne({ address }).exec();
    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }
    return user.favoriteCoins;
  }
}
