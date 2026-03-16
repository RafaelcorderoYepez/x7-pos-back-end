import { Test, TestingModule } from '@nestjs/testing';
import { PayrollRunsController } from './payroll-runs.controller';
import { PayrollRunsService } from './payroll-runs.service';
import { PayrollRunStatus } from './constants/payroll-run-status.enum';

describe('PayrollRunsController', () => {
  let controller: PayrollRunsController;

  const mockPayrollRunsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollRunsController],
      providers: [
        {
          provide: PayrollRunsService,
          useValue: mockPayrollRunsService,
        },
      ],
    }).compile();

    controller = module.get<PayrollRunsController>(PayrollRunsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with dto', async () => {
      const dto = {
        company_id: 1,
        merchant_id: 1,
        period_start: '2024-01-01',
        period_end: '2024-01-15',
        status: PayrollRunStatus.DRAFT,
      };
      mockPayrollRunsService.create.mockResolvedValue({
        statusCode: 201,
        message: 'Payroll run created successfully',
        data: { id: 1, ...dto },
      });
      await controller.create(dto);
      expect(mockPayrollRunsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with query', async () => {
      const query = { page: 1, limit: 10 };
      mockPayrollRunsService.findAll.mockResolvedValue({
        statusCode: 200,
        data: [],
        paginationMeta: {},
      });
      await controller.findAll(query);
      expect(mockPayrollRunsService.findAll).toHaveBeenCalledWith(query);
    });
  });
});
