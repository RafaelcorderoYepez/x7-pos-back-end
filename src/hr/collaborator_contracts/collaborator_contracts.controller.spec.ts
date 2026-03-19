import { Test, TestingModule } from '@nestjs/testing';
import { CollaboratorContractsController } from './collaborator_contracts.controller';
import { CollaboratorContractsService } from './collaborator_contracts.service';

describe('CollaboratorContractsController', () => {
  let controller: CollaboratorContractsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaboratorContractsController],
      providers: [CollaboratorContractsService],
    }).compile();

    controller = module.get<CollaboratorContractsController>(CollaboratorContractsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
