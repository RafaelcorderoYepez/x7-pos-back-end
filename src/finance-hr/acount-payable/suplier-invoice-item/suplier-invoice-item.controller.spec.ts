import { Test, TestingModule } from '@nestjs/testing';
import { SuplierInvoiceItemController } from './suplier-invoice-item.controller';
import { SuplierInvoiceItemService } from './suplier-invoice-item.service';

describe('SuplierInvoiceItemController', () => {
  let controller: SuplierInvoiceItemController;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuplierInvoiceItemController],
      providers: [
        { provide: SuplierInvoiceItemService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<SuplierInvoiceItemController>(
      SuplierInvoiceItemController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
