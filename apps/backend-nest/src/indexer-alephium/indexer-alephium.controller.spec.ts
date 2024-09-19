import { Test, TestingModule } from '@nestjs/testing';
import { IndexerAlephiumController } from './indexer-alephium.controller';

describe('IndexerAlephiumController', () => {
  let controller: IndexerAlephiumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndexerAlephiumController],
    }).compile();

    controller = module.get<IndexerAlephiumController>(
      IndexerAlephiumController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
