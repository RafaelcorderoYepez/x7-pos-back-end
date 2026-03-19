import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PayrollTaxDetailsService } from './payroll-tax-details.service';
import { PayrollTaxDetail } from './entities/payroll-tax-detail.entity';
import { PayrollEntry } from '../payroll-entries/entities/payroll-entry.entity';

describe('PayrollTaxDetailsService', () => {
  let service: PayrollTaxDetailsService;

  const mockTaxDetailRepo = {
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

  const mockPayrollEntryRepo = { findOne: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayrollTaxDetailsService,
        {
          provide: getRepositoryToken(PayrollTaxDetail),
          useValue: mockTaxDetailRepo,
        },
        {
          provide: getRepositoryToken(PayrollEntry),
          useValue: mockPayrollEntryRepo,
        },
      ],
    }).compile();

    service = module.get<PayrollTaxDetailsService>(PayrollTaxDetailsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a payroll tax detail successfully', async () => {
      const dto = {
        payroll_entry_id: 1,
        tax_type: 'Income tax',
        percentage: 19,
        amount: 15000,
      };
      const saved = {
        id: 1,
        ...dto,
        created_at: new Date(),
        deleted_at: null,
      };
      mockPayrollEntryRepo.findOne.mockResolvedValue({ id: 1 });
      mockTaxDetailRepo.create.mockReturnValue(saved);
      mockTaxDetailRepo.save.mockResolvedValue(saved);

      const result = await service.create(dto);

      expect(result.statusCode).toBe(201);
      expect(result.message).toBe('Payroll tax detail created successfully');
      expect(result.data.id).toBe(1);
    });

    it('should throw NotFoundException when payroll entry does not exist', async () => {
      mockPayrollEntryRepo.findOne.mockResolvedValue(null);
      await expect(
        service.create({
          payroll_entry_id: 999,
          tax_type: 'VAT',
          percentage: 16,
          amount: 1000,
        }),
      ).rejects.toThrow('Payroll entry with ID 999 not found');
    });
  });
});
