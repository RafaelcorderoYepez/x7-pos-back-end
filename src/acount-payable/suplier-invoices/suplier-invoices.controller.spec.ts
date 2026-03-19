import { Test, TestingModule } from '@nestjs/testing';
import { SuplierInvoicesController } from './suplier-invoices.controller';
import { SuplierInvoicesService } from './suplier-invoices.service';

describe('SuplierInvoicesController', () => {
  let controller: SuplierInvoicesController;

  const mockSuplierInvoicesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuplierInvoicesController],
      providers: [
        {
          provide: SuplierInvoicesService,
          useValue: mockSuplierInvoicesService,
        },
      ],
    }).compile();

    controller = module.get<SuplierInvoicesController>(SuplierInvoicesController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with dto', async () => {
      const dto = {
        company_id: 1,
        supplier_id: 1,
        invoice_number: 'INV-001',
        invoice_date: '2025-03-01',
        due_date: '2025-03-31',
        subtotal: 1000,
        total_amount: 1190,
      };
      mockSuplierInvoicesService.create.mockResolvedValue({
        statusCode: 201,
        message: 'Supplier invoice created successfully',
        data: { id: 1, ...dto },
      });
      await controller.create(dto);
      expect(mockSuplierInvoicesService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with query', async () => {
      const query = { page: 1, limit: 10 };
      mockSuplierInvoicesService.findAll.mockResolvedValue({
        statusCode: 200,
        data: [],
        paginationMeta: {},
      });
      await controller.findAll(query);
      expect(mockSuplierInvoicesService.findAll).toHaveBeenCalledWith(query);
    });
  });
});
