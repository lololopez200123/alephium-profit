import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { Types } from 'mongoose';
import { RolesGuard } from 'src/guards/roles-guard.guard';
import { AdminAccess } from 'src/decorators/admin.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-guard.guard';

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
}

// curl -X POST http://tu-servidor.com/users \
// -H "Content-Type: application/json" \
// -d '{
//   "name": "Nombre del Usuario",
//   "email": "usuario@example.com",
//   "walletId": "identificacion_billetera"
// }'
