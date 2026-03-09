import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptTaxController } from './receipt-tax.controller';
import { ReceiptTaxService } from './receipt-tax.service';

describe('ReceiptTaxController', () => {
  let controller: ReceiptTaxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptTaxController],
      providers: [ReceiptTaxService],
    }).compile();

    controller = module.get<ReceiptTaxController>(ReceiptTaxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
