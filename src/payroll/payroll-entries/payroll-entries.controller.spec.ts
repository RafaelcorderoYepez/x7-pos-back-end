import { Test, TestingModule } from '@nestjs/testing';
import { PayrollEntriesController } from './payroll-entries.controller';
import { PayrollEntriesService } from './payroll-entries.service';

describe('PayrollEntriesController', () => {
  let controller: PayrollEntriesController;

  const mockPayrollEntriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollEntriesController],
      providers: [
        {
          provide: PayrollEntriesService,
          useValue: mockPayrollEntriesService,
        },
      ],
    }).compile();

    controller = module.get<PayrollEntriesController>(PayrollEntriesController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with dto', async () => {
      const dto = { payroll_run_id: 1, collaborator_id: 1, base_pay: 50000 };
      mockPayrollEntriesService.create.mockResolvedValue({
        statusCode: 201,
        message: 'Payroll entry created successfully',
        data: { id: 1, ...dto },
      });
      await controller.create(dto);
      expect(mockPayrollEntriesService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll with query', async () => {
      const query = { page: 1, limit: 10 };
      mockPayrollEntriesService.findAll.mockResolvedValue({
        statusCode: 200,
        data: [],
        paginationMeta: {},
      });
      await controller.findAll(query);
      expect(mockPayrollEntriesService.findAll).toHaveBeenCalledWith(query);
    });
  });
});
