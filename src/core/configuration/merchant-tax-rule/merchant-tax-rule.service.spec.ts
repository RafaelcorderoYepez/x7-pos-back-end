//src/core/configuration/merchant-tax-rule/merchant-tax-rule.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MerchantTaxRuleService } from './merchant-tax-rule.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MerchantTaxRule } from './entity/merchant-tax-rule.entity';
import { Company } from 'src/platform-saas/companies/entities/company.entity';
import { TaxType } from '../constants/tax-type.enum';
import { CreateMerchantTaxRuleDto } from './dto/create-merchant-tax-rule.dto';
import { UpdateMerchantTaxRuleDto } from './dto/update-merchant-tax-rule.dto';
import { SelectQueryBuilder } from 'typeorm';
import { Repository, In } from 'typeorm';
import { User } from 'src/platform-saas/users/entities/user.entity';

describe('MerchantTaxRuleService', () => {
  let service: MerchantTaxRuleService;
  let merchantTaxRuleRepository: Repository<MerchantTaxRule>;
  let companyRepository: Repository<Company>;
  let userRepository: Repository<User>;

  //Mock Data
  const mockMerchantTaxRule: Partial<MerchantTaxRule> = {
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
      suppliers: [],
      merchants: [],
      customers: [],
      configurations: [],
    } as Company,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: { id: 1 } as User,
    updatedBy: { id: 1 } as User,
    status: 'active',
    name: 'Test Merchant Tax Rule',
    description: 'Description of the merchant tax rule',
    taxType: TaxType.COMPOUND,
    rate: 19,
    appliesToTips: true,
    appliesToOvertime: true,
    isCompound: true,
    externalTaxCode: 'lfgtr-hhse',
  };

  const mockCreateMerchantTaxRuleDto: CreateMerchantTaxRuleDto = {
    companyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: 1,
    updatedById: 1,
    status: 'active',
    name: 'Test Merchant Tax Rule',
    description: 'Description of the merchant tax rule',
    taxType: TaxType.COMPOUND,
    rate: 19,
    appliesToTips: true,
    appliesToOvertime: true,
    isCompound: true,
    externalTaxCode: 'lfgtr-hhse',
  };

  const mockUpdateMerchantTaxRuleDto: UpdateMerchantTaxRuleDto = {
    companyId: 1,
    createdById: 1,
    updatedById: 1,
    status: 'inactive',
    name: 'Update Merchant Tax Rule',
    description: 'Description of the merchant tax rule',
    taxType: TaxType.COMPOUND,
    rate: 19,
    appliesToTips: true,
    appliesToOvertime: true,
    isCompound: true,
    externalTaxCode: 'lfgtr-hhse',
  };

  beforeEach(async () => {
    const mockQueryBuilder: any = {
      leftJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[mockMerchantTaxRule], 1]),
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
        MerchantTaxRuleService,
        {
          provide: getRepositoryToken(MerchantTaxRule),
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

    service = module.get<MerchantTaxRuleService>(MerchantTaxRuleService);
    merchantTaxRuleRepository = module.get<Repository<MerchantTaxRule>>(
      getRepositoryToken(MerchantTaxRule),
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
      expect(merchantTaxRuleRepository).toBeDefined();
    });
  });

  describe('Create Merchant Tax Rule', () => {
    it('should create and return a merchant tax rule successfully', async () => {
      jest
        .spyOn(merchantTaxRuleRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as MerchantTaxRule);
      jest.spyOn(companyRepository, 'findOne').mockResolvedValue({
        id: 1,
      } as Company);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: 1,
      } as User);

      const createSpy = jest.spyOn(merchantTaxRuleRepository, 'create');
      const saveSpy = jest.spyOn(merchantTaxRuleRepository, 'save');

      createSpy.mockReturnValue(mockMerchantTaxRule as MerchantTaxRule);
      saveSpy.mockResolvedValue(mockMerchantTaxRule as MerchantTaxRule);
      const result = await service.create(mockCreateMerchantTaxRuleDto);

      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          company: { id: 1 },
        }),
      );
      expect(saveSpy).toHaveBeenCalledWith(mockMerchantTaxRule);
      expect(result).toEqual({
        statusCode: 201,
        message: 'Merchant Tax Rule created successfully',
        data: mockMerchantTaxRule,
      });
    });

    it('should handle database errors during creation', async () => {
      jest
        .spyOn(merchantTaxRuleRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as MerchantTaxRule);
      jest.spyOn(companyRepository, 'findOne').mockResolvedValue({
        id: 1,
      } as Company);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: 1,
      } as User);

      const createSpy = jest.spyOn(merchantTaxRuleRepository, 'create');
      const saveSpy = jest.spyOn(merchantTaxRuleRepository, 'save');

      createSpy.mockReturnValue(mockMerchantTaxRule as MerchantTaxRule);
      saveSpy.mockRejectedValue(new Error('Database error'));

      await expect(
        service.create(mockCreateMerchantTaxRuleDto),
      ).rejects.toThrow('Database error');

      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          company: { id: 1 },
        }),
      );
      expect(saveSpy).toHaveBeenCalledWith(mockMerchantTaxRule);
    });
  });

  describe('Find All Merchant Tax Rules', () => {
    it('should return all merchant tax rules', async () => {
      const mockMerchantTaxRules = [mockMerchantTaxRule as MerchantTaxRule];

      // QueryBuilder ya mockeado en el beforeEach
      const qb = merchantTaxRuleRepository.createQueryBuilder() as Partial<
        SelectQueryBuilder<MerchantTaxRule>
      >;

      jest
        .spyOn(qb, 'getManyAndCount')
        .mockResolvedValue([mockMerchantTaxRules, mockMerchantTaxRules.length]);

      const result = await service.findAll({
        page: 1,
        limit: 10,
      });

      expect(result).toEqual({
        statusCode: 200,
        message: 'Merchant Tax Rules retrieved successfully',
        data: mockMerchantTaxRules,
        pagination: {
          page: 1,
          limit: 10,
          total: mockMerchantTaxRules.length,
          totalPages: 1,
        },
      });
    });

    it('should return an empty array when no merchant tax rule found', async () => {
      const qb = merchantTaxRuleRepository.createQueryBuilder() as Partial<
        SelectQueryBuilder<MerchantTaxRule>
      >;

      jest.spyOn(qb, 'getManyAndCount').mockResolvedValue([[], 0]);

      const result = await service.findAll({
        page: 1,
        limit: 10,
      });

      expect(result).toEqual({
        statusCode: 200,
        message: 'Merchant Tax Rules retrieved successfully',
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

  describe('Find One Merchant Tax Rule', () => {
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

    it('should handle not found merchant tax rule', async () => {
      const findOneSpy = jest.spyOn(merchantTaxRuleRepository, 'findOne');
      findOneSpy.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        'Merchant Tax Rule not found',
      );

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 999,
          status: In(['active', 'inactive']),
        },
        relations: ['company', 'createdBy', 'updatedBy'],
      });
    });

    it('should return a merchant tax rule when found', async () => {
      const mockFound = {
        id: 1,
        company: {
          id: 1,
        } as Company,
        createdBy: { id: 1 } as User,
        updatedBy: { id: 1 } as User,
        status: 'active',
        name: 'Test Merchant Tax Rule',
        description: 'Description of the merchant tax rule',
        taxType: TaxType.COMPOUND,
        rate: 19,
        appliesToTips: true,
        appliesToOvertime: true,
        isCompound: true,
        externalTaxCode: 'lfgtr-hhse',
      } as MerchantTaxRule;

      jest
        .spyOn(merchantTaxRuleRepository, 'findOne')
        .mockResolvedValue(mockFound);

      const result = await service.findOne(1);

      expect(result).toEqual({
        statusCode: 200,
        message: 'Merchant Tax Rule retrieved successfully',
        data: mockFound,
      });
    });
  });

  describe('Update Merchant Tax Rule', () => {
    it('should update and return a merchant tax rule successfully', async () => {
      const updatedMerchantTaxRule: Partial<MerchantTaxRule> = {
        ...mockMerchantTaxRule,
        ...mockUpdateMerchantTaxRuleDto,
        company: mockMerchantTaxRule.company,
        createdBy: mockMerchantTaxRule.createdBy,
        updatedBy: mockMerchantTaxRule.updatedBy,
      };

      const findOneSpy = jest.spyOn(merchantTaxRuleRepository, 'findOne');
      const saveSpy = jest.spyOn(merchantTaxRuleRepository, 'save');

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as User);
      jest
        .spyOn(companyRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as Company);

      findOneSpy.mockResolvedValue(mockMerchantTaxRule as MerchantTaxRule);
      saveSpy.mockResolvedValue(updatedMerchantTaxRule as MerchantTaxRule);
      const result = await service.update(1, mockUpdateMerchantTaxRuleDto);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 1,
          status: In(['active', 'inactive']),
        },
        relations: ['company'],
      });
      expect(saveSpy).toHaveBeenCalledWith(updatedMerchantTaxRule);
      expect(result).toEqual({
        statusCode: 200,
        message: 'Merchant Tax Rule updated successfully',
        data: updatedMerchantTaxRule,
      });
    });

    it('should throw error for invalid ID during update', async () => {
      await expect(
        service.update(0, mockUpdateMerchantTaxRuleDto),
      ).rejects.toThrow();
    });

    it('should throw error when merchant tax rule to update not found', async () => {
      const findOneSpy = jest.spyOn(merchantTaxRuleRepository, 'findOne');
      findOneSpy.mockResolvedValue(null);

      await expect(
        service.update(999, mockUpdateMerchantTaxRuleDto),
      ).rejects.toThrow('Merchant Tax Rule not found');
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 999,
          status: In(['active', 'inactive']),
        },
        relations: ['company'],
      });
    });

    it('should handle database errors during update', async () => {
      const findOneSpy = jest.spyOn(merchantTaxRuleRepository, 'findOne');
      const saveSpy = jest.spyOn(merchantTaxRuleRepository, 'save');

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as User);
      jest
        .spyOn(companyRepository, 'findOne')
        .mockResolvedValue({ id: 1 } as Company);

      findOneSpy.mockResolvedValue(mockMerchantTaxRule as MerchantTaxRule);
      saveSpy.mockRejectedValue(new Error('Database error'));

      await expect(
        service.update(1, mockUpdateMerchantTaxRuleDto),
      ).rejects.toThrow('Database error');
    });
  });

  describe('Remove Merchant Tax Rule', () => {
    it('should remove a merchant tax rule successfully', async () => {
      const findOneSpy = jest.spyOn(merchantTaxRuleRepository, 'findOne');
      const saveSpy = jest.spyOn(merchantTaxRuleRepository, 'save');

      findOneSpy.mockResolvedValue(mockMerchantTaxRule as MerchantTaxRule);
      saveSpy.mockResolvedValue(mockMerchantTaxRule as MerchantTaxRule);

      const result = await service.remove(1);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(saveSpy).toHaveBeenCalled();
      expect(result).toEqual({
        statusCode: 200,
        message: 'Merchant Tax Rule deleted successfully',
        data: mockMerchantTaxRule,
      });
    });

    it('should throw error for invalid ID during removal', async () => {
      await expect(service.remove(0)).rejects.toThrow();
    });

    it('should throw error when merchant tax rule to remove not found', async () => {
      const findOneSpy = jest.spyOn(merchantTaxRuleRepository, 'findOne');
      findOneSpy.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(
        'Merchant Tax Rule not found',
      );
      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 999,
        },
      });
    });
  });

  describe('Repository Integration', () => {
    it('should properly integrate with the merchant tax rule repository', () => {
      expect(merchantTaxRuleRepository).toBeDefined();
      expect(typeof merchantTaxRuleRepository.find).toBe('function');
      expect(typeof merchantTaxRuleRepository.findOne).toBe('function');
      expect(typeof merchantTaxRuleRepository.create).toBe('function');
      expect(typeof merchantTaxRuleRepository.save).toBe('function');
      expect(typeof merchantTaxRuleRepository.remove).toBe('function');
    });
  });
});
