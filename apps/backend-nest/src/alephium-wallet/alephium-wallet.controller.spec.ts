import { Test, TestingModule } from '@nestjs/testing';
import { AlephiumWalletController } from './alephium-wallet.controller';

describe('AlephiumWalletController', () => {
  let controller: AlephiumWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlephiumWalletController],
    }).compile();

    controller = module.get<AlephiumWalletController>(AlephiumWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
