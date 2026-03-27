//src/core/configuration/merchant-payroll-rule/merchant-payroll-rule.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MerchantPayrollRuleController } from './merchant-payroll-rule.controller';
import { MerchantPayrollRuleService } from './merchant-payroll-rule.service';
import { MerchantPayrollRule } from './entity/merchant-payroll-rule.entity';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { PayrollFrequency } from '../constants/payroll-frequency.enum';

describe('MerchantPayrollRuleController', () => {
  let controller: MerchantPayrollRuleController;
  let service: MerchantPayrollRuleService;

  // Mock data
  const mockCompany: Company = {
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
    suppliers: [],
    configurations: [],
  } as Company;

  const mockUser = {
    id: 1,
  } as User;

  const mockMerchantPayrollRule: MerchantPayrollRule = {
    id: 1,
    company: mockCompany,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: mockUser,
    updatedBy: mockUser,
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

  const mockCreateMerchantPayrollRuleDto = {
    id: 1,
    companyId: mockCompany.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: mockUser.id,
    updatedById: mockUser.id,
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

  const mockPagination = {
    total: 1,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  const mockPaginatedResponse = {
    statusCode: 200,
    message: 'Merchant Payroll rules retrieved successfully',
    data: [mockMerchantPayrollRule],
    pagination: mockPagination,
  };

  const mockOneMerchantPayrollRuleResponseDto = {
    statusCode: 200,
    message: 'Merchant Payroll rule retrieved successfully',
    data: mockMerchantPayrollRule,
  };

  const mockUpdateMerchantPayrollRuleDto = {
    id: 1,
    company: mockCompany,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'Test User 2',
    updatedBy: 'Test User 2',
    status: 'inactive',
    name: 'Update Merchant Payroll Rule',
    frequencyPayroll: PayrollFrequency.MONTHLY,
    payDayOfWeek: 7,
    payDayOfMonth: 31,
    allowNegativePayroll: false,
    roundingPrecision: 1,
    currency: 'USD',
    autoApprovePayroll: true,
    requiresManagerApproval: true,
  };

  beforeEach(async () => {
    const mockMerchantPayrollRule = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchantPayrollRuleController],
      providers: [
        {
          provide: MerchantPayrollRuleService,
          useValue: mockMerchantPayrollRule,
        },
      ],
    }).compile();

    controller = module.get<MerchantPayrollRuleController>(
      MerchantPayrollRuleController,
    );
    service = module.get<MerchantPayrollRuleService>(
      MerchantPayrollRuleService,
    );
  });

  describe('Controller Initialization', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
    it('should have Merchant Payroll Rule Service defined', () => {
      expect(service).toBeDefined();
    });
  });

  //--------------------------------------------------------------
  // POST /merchant-payroll-rule
  //--------------------------------------------------------------
  describe('POST /merchant-payroll-rule', () => {
    it('should create a merchant payroll rule successfully', async () => {
      const expectedResponse = {
        statusCode: 201,
        message: 'Merchant payroll rule created successfully',
        data: mockMerchantPayrollRule,
      };

      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValue(expectedResponse);
      createSpy.mockResolvedValue(expectedResponse);

      const result = await controller.create(mockCreateMerchantPayrollRuleDto);

      expect(createSpy).toHaveBeenCalledWith(mockCreateMerchantPayrollRuleDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle errors during creation', async () => {
      const errorMessage = 'Failed to create Merchant Payroll Rule';
      const createSpy = jest
        .spyOn(service, 'create')
        .mockRejectedValue(new Error(errorMessage));
      createSpy.mockRejectedValue(new Error(errorMessage));

      await expect(
        controller.create(mockCreateMerchantPayrollRuleDto),
      ).rejects.toThrow(errorMessage);

      expect(createSpy).toHaveBeenCalledWith(mockCreateMerchantPayrollRuleDto);
    });
  });
  //--------------------------------------------------------------
  // GET /merchant-payroll-rule
  //--------------------------------------------------------------
  describe('GET /merchant-payroll-rule', () => {
    it('should retrieve all merchant payroll rules successfully', async () => {
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(mockPaginatedResponse);
      findAllSpy.mockResolvedValue(mockPaginatedResponse);

      const result = await controller.findAll({ page: 1, limit: 10 });

      expect(findAllSpy).toHaveBeenCalledWith({ page: 1, limit: 10 });
      expect(result).toEqual(mockPaginatedResponse);
    });

    it('should return empty list with pagination', async () => {
      const emptyPaginatedResponse = {
        statusCode: 200,
        message: 'Merchant payroll rules retrieved successfully',
        data: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
      };

      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(emptyPaginatedResponse);
      findAllSpy.mockResolvedValue(emptyPaginatedResponse);

      const result = await controller.findAll({ page: 1, limit: 10 });

      expect(findAllSpy).toHaveBeenCalledWith({ page: 1, limit: 10 });
      expect(result).toEqual(emptyPaginatedResponse);
    });

    it('should handle service errors in findAll', async () => {
      const errorMessage = 'Failed to retrieve Merchant Payroll Rules';
      const findAllSpy = jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new Error(errorMessage));
      findAllSpy.mockRejectedValue(new Error(errorMessage));

      await expect(controller.findAll({ page: 1, limit: 10 })).rejects.toThrow(
        errorMessage,
      );

      expect(findAllSpy).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });
  //--------------------------------------------------------------
  // GET /merchant-payroll-rule/:id
  //--------------------------------------------------------------
  describe('GET /merchant-payroll-rule/:id', () => {
    it('should retrieve a merchant payroll rule by id successfully', async () => {
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockOneMerchantPayrollRuleResponseDto);
      findOneSpy.mockResolvedValue(mockOneMerchantPayrollRuleResponseDto);

      const result = await controller.findOne(1);

      expect(findOneSpy).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOneMerchantPayrollRuleResponseDto);
    });

    it('should handle errors when retrieving by ID', async () => {
      const errorMessage = 'Failed to retrieve Merchant Payroll Rule';
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new Error(errorMessage));
      findOneSpy.mockRejectedValue(new Error(errorMessage));

      await expect(controller.findOne(1)).rejects.toThrow(errorMessage);

      expect(findOneSpy).toHaveBeenCalledWith(1);
    });
  });
  //--------------------------------------------------------------
  // PATCH /merchant-payroll-rule/:id
  //--------------------------------------------------------------
  describe('PATCH /merchant-payroll-rule/:id', () => {
    it('should update a merchant payroll rule successfully', async () => {
      const updatedResponse = {
        statusCode: 200,
        message: 'Merchant Payroll Rule updated successfully',
        data: mockMerchantPayrollRule,
      };
      const updateSpy = jest
        .spyOn(service, 'update')
        .mockResolvedValue(updatedResponse);
      updateSpy.mockResolvedValue(updatedResponse);

      const result = await controller.update(
        1,
        mockUpdateMerchantPayrollRuleDto,
      );

      expect(updateSpy).toHaveBeenCalledWith(
        1,
        mockUpdateMerchantPayrollRuleDto,
      );
      expect(result).toEqual(updatedResponse);
    });

    it('should handle errors during update', async () => {
      const errorMessage = 'Failed to update Merchant Payroll Rule';
      const updateSpy = jest
        .spyOn(service, 'update')
        .mockRejectedValue(new Error(errorMessage));
      updateSpy.mockRejectedValue(new Error(errorMessage));

      await expect(
        controller.update(1, mockUpdateMerchantPayrollRuleDto),
      ).rejects.toThrow(errorMessage);

      expect(updateSpy).toHaveBeenCalledWith(
        1,
        mockUpdateMerchantPayrollRuleDto,
      );
    });
  });
  //--------------------------------------------------------------
  // DELETE /merchant-payroll-rule/:id
  //--------------------------------------------------------------
  describe('DELETE /merchant-payroll-rule/:id', () => {
    it('should delete a merchant payroll rule successfully', async () => {
      const deleteResponse = {
        statusCode: 200,
        message: 'Merchant Payroll Rule deleted successfully',
        data: mockOneMerchantPayrollRuleResponseDto.data,
      };
      const removeSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValue(deleteResponse);
      removeSpy.mockResolvedValue(deleteResponse);

      const result = await controller.remove(1);

      expect(removeSpy).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResponse);
    });

    it('should handle errors during deletion', async () => {
      const errorMessage = 'Failed to delete Merchant Payroll Rule';
      const removeSpy = jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new Error(errorMessage));
      removeSpy.mockRejectedValue(new Error(errorMessage));

      await expect(controller.remove(1)).rejects.toThrow(errorMessage);

      expect(removeSpy).toHaveBeenCalledWith(1);
    });
  });
});
