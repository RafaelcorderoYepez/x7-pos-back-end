import { Test, TestingModule } from '@nestjs/testing';
import { LedgerAccountsController } from './ledger-accounts.controller';
import { LedgerAccountsService } from './ledger-accounts.service';

describe('LedgerAccountsController', () => {
  let controller: LedgerAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LedgerAccountsController],
      providers: [LedgerAccountsService],
    }).compile();

    controller = module.get<LedgerAccountsController>(LedgerAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
