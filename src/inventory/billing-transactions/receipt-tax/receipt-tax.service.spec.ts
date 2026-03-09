import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptTaxService } from './receipt-tax.service';

describe('ReceiptTaxService', () => {
  let service: ReceiptTaxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiptTaxService],
    }).compile();

    service = module.get<ReceiptTaxService>(ReceiptTaxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
