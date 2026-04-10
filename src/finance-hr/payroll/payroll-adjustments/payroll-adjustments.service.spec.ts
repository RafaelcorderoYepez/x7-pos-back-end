import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PayrollAdjustmentsService } from './payroll-adjustments.service';
import { PayrollAdjustment } from './entities/payroll-adjustment.entity';
import { PayrollEntry } from '../payroll-entries/entities/payroll-entry.entity';
import { AdjustmentType } from './constants/adjustment-type.enum';

describe('PayrollAdjustmentsService', () => {
  let service: PayrollAdjustmentsService;

  const mockAdjustmentRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockResolvedValue(0),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    })),
  };

  const mockPayrollEntryRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayrollAdjustmentsService,
        {
          provide: getRepositoryToken(PayrollAdjustment),
          useValue: mockAdjustmentRepo,
        },
        {
          provide: getRepositoryToken(PayrollEntry),
          useValue: mockPayrollEntryRepo,
        },
      ],
    }).compile();

    service = module.get<PayrollAdjustmentsService>(PayrollAdjustmentsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a payroll adjustment successfully', async () => {
      const dto = {
        payroll_entry_id: 1,
        adjustment_type: AdjustmentType.BONUS,
        description: 'Bonus',
        amount: 100,
      };
      const saved = {
        id: 1,
        payroll_entry_id: 1,
        adjustment_type: AdjustmentType.BONUS,
        description: 'Bonus',
        amount: 100,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      mockPayrollEntryRepo.findOne.mockResolvedValue({ id: 1 });
      mockAdjustmentRepo.create.mockReturnValue(saved);
      mockAdjustmentRepo.save.mockResolvedValue(saved);

      const result = await service.create(dto);

      expect(result.statusCode).toBe(201);
      expect(result.message).toBe('Payroll adjustment created successfully');
      expect(result.data.id).toBe(1);
    });

    it('should throw NotFoundException when payroll entry does not exist', async () => {
      mockPayrollEntryRepo.findOne.mockResolvedValue(null);
      await expect(
        service.create({
          payroll_entry_id: 999,
          adjustment_type: AdjustmentType.BONUS,
          amount: 100,
        }),
      ).rejects.toThrow('Payroll entry with ID 999 not found');
    });
  });
});
