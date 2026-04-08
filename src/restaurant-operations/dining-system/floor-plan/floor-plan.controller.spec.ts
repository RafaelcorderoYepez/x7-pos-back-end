import { Test, TestingModule } from '@nestjs/testing';
import { FloorPlanController } from './floor-plan.controller';
import { FloorPlanService } from './floor-plan.service';

describe('FloorPlanController', () => {
  let controller: FloorPlanController;

  const mockFloorPlanService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloorPlanController],
      providers: [
        {
          provide: FloorPlanService,
          useValue: mockFloorPlanService,
        },
      ],
    }).compile();

    controller = module.get<FloorPlanController>(FloorPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
