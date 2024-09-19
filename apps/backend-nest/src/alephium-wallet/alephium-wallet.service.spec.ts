import { Test, TestingModule } from '@nestjs/testing';
import { AlephiumWalletService } from './alephium-wallet.service';

describe('AlephiumWalletService', () => {
  let service: AlephiumWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlephiumWalletService],
    }).compile();

    service = module.get<AlephiumWalletService>(AlephiumWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
