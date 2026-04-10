import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FloorZoneService } from './floor-zone.service';
import { FloorZone } from './entity/floor-zone.entity';
import { Merchant } from 'src/platform-saas/merchants/entities/merchant.entity';
import { FloorPlan } from '../floor-plan/entity/floor-plan.entity';

describe('FloorZoneService', () => {
  let service: FloorZoneService;

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
        FloorZoneService,
        {
          provide: getRepositoryToken(FloorZone),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Merchant),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(FloorPlan),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FloorZoneService>(FloorZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
