import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FloorPlanService } from './floor-plan.service';
import { FloorPlan } from './entity/floor-plan.entity';
import { Merchant } from 'src/platform-saas/merchants/entities/merchant.entity';

describe('FloorPlanService', () => {
  let service: FloorPlanService;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      leftJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FloorPlanService,
        {
          provide: getRepositoryToken(FloorPlan),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Merchant),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FloorPlanService>(FloorPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
