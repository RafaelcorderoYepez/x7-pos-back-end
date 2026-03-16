import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorContractsService } from './collaborator_contracts.service';

describe('CollaboratorContractsService', () => {
  let service: CollaboratorContractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollaboratorContractsService],
    }).compile();

    service = module.get<CollaboratorContractsService>(CollaboratorContractsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
