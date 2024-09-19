import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/models/user.model';
import { JwtService } from '@nestjs/jwt';

// Mock para el servicio de JWT
const jwtServiceMock = {
  sign: jest.fn(() => 'mocked-token'),
};

// Mock del schema de mongo
const userModelMock = {
  findOne: jest.fn(),
  create: jest.fn(),
};

// Mock para el servicio de correo
const clientMailServiceMock = {
  emit: jest.fn(),
};

describe('Examen del AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        EventEmitter2,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        { provide: getModelToken(User.name), useValue: userModelMock },
        { provide: 'MAIL_SERVICE', useValue: clientMailServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Login', () => {
    it('should return token and user data on successful login', async () => {});
  });
});
