import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

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

  async updateSomeProperties(id: string, user: Partial<IUser>) {
    try {
      const updatedUser = await this.userModel
        .findOneAndUpdate({ _id: id }, user, { new: true })
        .exec();
      if (!updatedUser) {
        throw new HttpException('User not found', 404);
      }
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error updating player properties', 500);
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

  /**
   * Obtiene los tokens favoritos de un usuario.
   * @param address Dirección del usuario
   * @returns Arreglo de direcciones de tokens favoritos
   */
  async getFavoriteCoins(address: string): Promise<string[]> {
    const user = await this.userModel.findOne({ address }).exec();
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user.favoriteTokens;
  }

  /**
   * Agrega un token a la lista de favoritos del usuario.
   * @param address Dirección del usuario
   * @param tokenAddress Dirección del token a agregar
   * @returns Usuario actualizado
   */
  async addFavoriteCoin(address: string, tokenAddress: string): Promise<User> {
    const user = await this.userModel.findOne({ address }).exec();
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!user.favoriteTokens.includes(tokenAddress)) {
      user.favoriteTokens.push(tokenAddress);
      await user.save();
    }

    return user;
  }

  /**
   * Elimina un token de la lista de favoritos del usuario.
   * @param address Dirección del usuario
   * @param tokenAddress Dirección del token a eliminar
   * @returns Usuario actualizado
   */
  async removeFavoriteCoin(
    address: string,
    tokenAddress: string,
  ): Promise<User> {
    const user = await this.userModel.findOne({ address }).exec();
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const index = user.favoriteTokens.indexOf(tokenAddress);
    if (index > -1) {
      user.favoriteTokens.splice(index, 1);
      await user.save();
    }

    return user;
  }
}
