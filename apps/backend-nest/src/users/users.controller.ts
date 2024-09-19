import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { Types } from 'mongoose';
import { RolesGuard } from 'src/guards/roles-guard.guard';
import { AdminAccess } from 'src/decorators/admin.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-guard.guard';
import { RequestWithUser } from './interfaces/user.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AdminAccess()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @AdminAccess()
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @AdminAccess()
  @Get(':id')
  async findUserByAdress(@Param('adress') address: string): Promise<User> {
    if (!Types.ObjectId.isValid(address)) {
      throw new BadRequestException('Invalid ID!');
    }
    return this.userService.findUserByAddress(address);
  }

  @Post('favorite-coin')
  async addFavoriteCoin(
    @Req() req: RequestWithUser,
    @Body('coin') coin: string,
  ) {
    const address = req.user['address']; // Asegúrate de que 'address' está disponible en req.user
    if (!coin) {
      throw new BadRequestException('Se requiere el nombre de la moneda');
    }
    await this.userService.addFavoriteCoin(address, coin);
    return { message: 'Moneda añadida a favoritos' };
  }

  @Delete('favorite-coin')
  async removeFavoriteCoin(
    @Req() req: RequestWithUser,
    @Body('coin') coin: string,
  ) {
    const address = req.user['address'];
    if (!coin) {
      throw new BadRequestException('Se requiere el nombre de la moneda');
    }
    await this.userService.removeFavoriteCoin(address, coin);
    return { message: 'Moneda eliminada de favoritos' };
  }

  @Get('favorite-coins')
  async getFavoriteCoins(@Req() req: RequestWithUser) {
    const address = req.user['address'];
    const favoriteCoins = await this.userService.getFavoriteCoins(address);
    return { favoriteCoins };
  }
}
