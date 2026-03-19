//src/configuration/merchant-payroll-rule/merchant-payroll-rule.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MerchantPayrollRuleService } from './merchant-payroll-rule.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MerchantPayrollRule } from './entity/merchant-payroll-rule.entity';
import { Company } from 'src/companies/entities/company.entity';
import { PayrollFrequency } from '../constants/payroll-frequency.enum';
import { CreateMerchantPayrollRuleDto } from './dto/create-merchant-payroll-rule.dto';
import { UpdateMerchantPayrollRuleDto } from './dto/update-merchant-payroll-rule.dto';
import { SelectQueryBuilder } from 'typeorm';
import { Repository, In } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

describe('MerchantPayrollRuleService', () => {
  let service: MerchantPayrollRuleService;
  let merchantPayrollRuleRepository: Repository<MerchantPayrollRule>;
  let companyRepository: Repository<Company>;
  let userRepository: Repository<User>;

  //Mock Data
  const mockMerchantPayrollRule: Partial<MerchantPayrollRule> = {
    id: 1,
    company: {
      id: 1,
      name: 'Test Company',
      email: 'test@company.com',
      phone: '1234567890',
      rut: '12345678-9',
      address: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      merchants: [],
      customers: [],
      configurations: [],
    } as Company,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: { id: 1 } as User,
    updatedBy: { id: 1 } as User,
    status: 'active',
    name: 'Test Merchant Payroll Rule',
    frequencyPayroll: PayrollFrequency.CUSTOM,
    payDayOfWeek: 2,
    payDayOfMonth: 23,
    allowNegativePayroll: true,
    roundingPrecision: 2,
    currency: 'CLP',
    autoApprovePayroll: true,
    requiresManagerApproval: true,
  };

  const mockCreateMerchantPayrollRuleDto: CreateMerchantPayrollRuleDto = {
    companyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: 1,
    updatedById: 1,
    status: 'active',
    name: 'Test Merchant Payroll Rule',
    frequencyPayroll: PayrollFrequency.CUSTOM,
    payDayOfWeek: 2,
    payDayOfMonth: 23,
    allowNegativePayroll: true,
    roundingPrecision: 2,
    currency: 'CLP',
    autoApprovePayroll: true,
    requiresManagerApproval: true,
  };

  const mockUpdateMerchantPayrollRuleDto: UpdateMerchantPayrollRuleDto = {
    companyId: 1,
    createdById: 1,
    updatedById: 1,
    status: 'inactive',
    name: 'Update Merchant Payroll Rule',
    frequencyPayroll: PayrollFrequency.BIWEEKLY,
    payDayOfWeek: 4,
    payDayOfMonth: 29,
    allowNegativePayroll: true,
    roundingPrecision: 2,
    currency: 'REAL',
    autoApprovePayroll: false,
    requiresManagerApproval: true,
  };

  beforeEach(async () => {
    const mockQueryBuilder: any = {
      leftJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest
        .fn()
        .mockResolvedValue([[mockMerchantPayrollRule], 1]),
    };

    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerchantPayrollRuleService,
        {
          provide: getRepositoryToken(MerchantPayrollRule),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Company),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MerchantPayrollRuleService>(
      MerchantPayrollRuleService,
    );
    merchantPayrollRuleRepository = module.get<Repository<MerchantPayrollRule>>(
      getRepositoryToken(MerchantPayrollRule),
    );
    companyRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('Service Initialization', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    it('repository should be defined', () => {
      expect(merchantPayrollRuleRepository).toBeDefined();
    });
  });

  describe('Create Merchant Payroll Rule', () => {
    it('should create and return a merchant payroll rule successfully', async () => {
      jest
        .spyOn(merchantPayrollRuleRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as MerchantPayrollRule);
      jest.spyOn(companyRepository, 'findOne').mockResolvedValue({
        id: 1,
      } as Company);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: 1,
      } as User);

      const createSpy = jest.spyOn(merchantPayrollRuleRepository, 'create');
      const saveSpy = jest.spyOn(merchantPayrollRuleRepository, 'save');

      createSpy.mockReturnValue(mockMerchantPayrollRule as MerchantPayrollRule);
      saveSpy.mockResolvedValue(mockMerchantPayrollRule as MerchantPayrollRule);
      const result = await service.create(mockCreateMerchantPayrollRuleDto);

      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          company: { id: 1 },
        }),
      );
      expect(saveSpy).toHaveBeenCalledWith(mockMerchantPayrollRule);
      expect(result).toEqual({
        statusCode: 201,
        message: 'Merchant Payroll Rule created successfully',
        data: mockMerchantPayrollRule,
      });
    });

    it('should handle database errors during creation', async () => {
      jest
        .spyOn(merchantPayrollRuleRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as MerchantPayrollRule);
      jest.spyOn(companyRepository, 'findOne').mockResolvedValue({
        id: 1,
      } as Company);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: 1,
      } as User);

      const createSpy = jest.spyOn(merchantPayrollRuleRepository, 'create');
      const saveSpy = jest.spyOn(merchantPayrollRuleRepository, 'save');

      createSpy.mockReturnValue(mockMerchantPayrollRule as MerchantPayrollRule);
      saveSpy.mockRejectedValue(new Error('Database error'));

      await expect(
        service.create(mockCreateMerchantPayrollRuleDto),
      ).rejects.toThrow('Database error');

      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          company: { id: 1 },
        }),
      );
      expect(saveSpy).toHaveBeenCalledWith(mockMerchantPayrollRule);
    });
  });

  describe('Find All Merchant Payroll Rules', () => {
    it('should return all merchant payroll rules', async () => {
      const mockMerchantPayrollRules = [
        mockMerchantPayrollRule as MerchantPayrollRule,
      ];

      // QueryBuilder ya mockeado en el beforeEach
      const qb = merchantPayrollRuleRepository.createQueryBuilder() as Partial<
        SelectQueryBuilder<MerchantPayrollRule>
      >;

      jest
        .spyOn(qb, 'getManyAndCount')
        .mockResolvedValue([
          mockMerchantPayrollRules,
          mockMerchantPayrollRules.length,
        ]);

      const result = await service.findAll({
        page: 1,
        limit: 10,
      });

      expect(result).toEqual({
        statusCode: 200,
        message: 'Merchant Payroll Rules retrieved successfully',
        data: mockMerchantPayrollRules,
        pagination: {
          page: 1,
          limit: 10,
          total: mockMerchantPayrollRules.length,
          totalPages: 1,
        },
      });
    });

    it('should return an empty array when no merchant payroll rule found', async () => {
      const qb = merchantPayrollRuleRepository.createQueryBuilder() as Partial<
        SelectQueryBuilder<MerchantPayrollRule>
      >;

      jest.spyOn(qb, 'getManyAndCount').mockResolvedValue([[], 0]);

      const result = await service.findAll({
        page: 1,
        limit: 10,
      });

      expect(result).toEqual({
        statusCode: 200,
        message: 'Merchant Payroll Rules retrieved successfully',
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      });
    });
  });

  describe('Find One Payroll Overtime Rule', () => {
    it('should throw error for invalid ID (null)', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await expect(service.findOne(null as any)).rejects.toThrow();
    });

    it('should throw error for invalid ID (zero)', async () => {
      await expect(service.findOne(0)).rejects.toThrow();
    });

    it('should throw error for invalid ID (negative)', async () => {
      await expect(service.findOne(-1)).rejects.toThrow();
    });

    it('should handle not found merchant payroll rule', async () => {
      const findOneSpy = jest.spyOn(merchantPayrollRuleRepository, 'findOne');
      findOneSpy.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        'Merchant Payroll Rule not found',
      );

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 999,
          status: In(['active', 'inactive']),
        },
        relations: ['company', 'createdBy', 'updatedBy'],
      });
    });

    it('should return a merchant payroll rule when found', async () => {
      const mockFound = {
        id: 1,
        company: {
          id: 1,
        } as Company,
        createdBy: { id: 1 } as User,
        updatedBy: { id: 1 } as User,
        status: 'active',
        name: 'Test Merchant Payroll Rule',
        frequencyPayroll: PayrollFrequency.BIWEEKLY,
        payDayOfWeek: 4,
        payDayOfMonth: 29,
        allowNegativePayroll: true,
        roundingPrecision: 2,
        currency: 'REAL',
        autoApprovePayroll: false,
        requiresManagerApproval: true,
      } as MerchantPayrollRule;

      jest
        .spyOn(merchantPayrollRuleRepository, 'findOne')
        .mockResolvedValue(mockFound);

      const result = await service.findOne(1);

      expect(result).toEqual({
        statusCode: 200,
        message: 'Merchant Payroll Rule retrieved successfully',
        data: mockFound,
      });
    });
  });

  describe('Update Merchant Payroll Rule', () => {
    it('should update and return a merchant payroll rule successfully', async () => {
      const updatedMerchantPayrollRule: Partial<MerchantPayrollRule> = {
        ...mockMerchantPayrollRule,
        ...mockUpdateMerchantPayrollRuleDto,
        company: mockMerchantPayrollRule.company,
        createdBy: mockMerchantPayrollRule.createdBy,
        updatedBy: mockMerchantPayrollRule.updatedBy,
      };

      const findOneSpy = jest.spyOn(merchantPayrollRuleRepository, 'findOne');
      const saveSpy = jest.spyOn(merchantPayrollRuleRepository, 'save');

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as User);
      jest
        .spyOn(companyRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as Company);

      findOneSpy.mockResolvedValue(
        mockMerchantPayrollRule as MerchantPayrollRule,
      );
      saveSpy.mockResolvedValue(
        updatedMerchantPayrollRule as MerchantPayrollRule,
      );
      const result = await service.update(1, mockUpdateMerchantPayrollRuleDto);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 1,
          status: In(['active', 'inactive']),
        },
        relations: ['company'],
      });
      expect(saveSpy).toHaveBeenCalledWith(updatedMerchantPayrollRule);
      expect(result).toEqual({
        statusCode: 200,
        message: 'Merchant Payroll Rule updated successfully',
        data: updatedMerchantPayrollRule,
      });
    });

    it('should throw error for invalid ID during update', async () => {
      await expect(
        service.update(0, mockUpdateMerchantPayrollRuleDto),
      ).rejects.toThrow();
    });

    it('should throw error when merchant payroll rule to update not found', async () => {
      const findOneSpy = jest.spyOn(merchantPayrollRuleRepository, 'findOne');
      findOneSpy.mockResolvedValue(null);

      await expect(
        service.update(999, mockUpdateMerchantPayrollRuleDto),
      ).rejects.toThrow('Merchant Payroll Rule not found');
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 999,
          status: In(['active', 'inactive']),
        },
        relations: ['company'],
      });
    });

    it('should handle database errors during update', async () => {
      const findOneSpy = jest.spyOn(merchantPayrollRuleRepository, 'findOne');
      const saveSpy = jest.spyOn(merchantPayrollRuleRepository, 'save');

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as User);
      jest
        .spyOn(companyRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as Company);

      findOneSpy.mockResolvedValue(
        mockMerchantPayrollRule as MerchantPayrollRule,
      );
      saveSpy.mockRejectedValue(new Error('Database error'));

      await expect(
        service.update(1, mockUpdateMerchantPayrollRuleDto),
      ).rejects.toThrow('Database error');
    });
  });

  describe('Remove Merchant Payroll Rule', () => {
    it('should remove a merchant payroll rule successfully', async () => {
      const findOneSpy = jest.spyOn(merchantPayrollRuleRepository, 'findOne');
      const saveSpy = jest.spyOn(merchantPayrollRuleRepository, 'save');

      findOneSpy.mockResolvedValue(
        mockMerchantPayrollRule as MerchantPayrollRule,
      );
      saveSpy.mockResolvedValue(mockMerchantPayrollRule as MerchantPayrollRule);

      const result = await service.remove(1);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(saveSpy).toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: 200,
        message: 'Merchant Payroll Rule deleted successfully',
        data: mockMerchantPayrollRule,
      });
    });

    it('should throw error for invalid ID during removal', async () => {
      await expect(service.remove(0)).rejects.toThrow();
    });

    it('should throw error when merchant payroll rule to remove not found', async () => {
      const findOneSpy = jest.spyOn(merchantPayrollRuleRepository, 'findOne');
      findOneSpy.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(
        'Merchant Payroll Rule not found',
      );
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 999,
        },
      });
    });
  });

  describe('Repository Integration', () => {
    it('should properly integrate with the merchant payroll rule repository', () => {
      expect(merchantPayrollRuleRepository).toBeDefined();
      expect(typeof merchantPayrollRuleRepository.find).toBe('function');
      expect(typeof merchantPayrollRuleRepository.findOne).toBe('function');
      expect(typeof merchantPayrollRuleRepository.create).toBe('function');
      expect(typeof merchantPayrollRuleRepository.save).toBe('function');
      expect(typeof merchantPayrollRuleRepository.remove).toBe('function');
    });
  });
});
