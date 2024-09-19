import { Test, TestingModule } from '@nestjs/testing';
import { IndexerAlephiumService } from './indexer-alephium.service';

describe('IndexerAlephiumService', () => {
  let service: IndexerAlephiumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexerAlephiumService],
    }).compile();

    service = module.get<IndexerAlephiumService>(IndexerAlephiumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
