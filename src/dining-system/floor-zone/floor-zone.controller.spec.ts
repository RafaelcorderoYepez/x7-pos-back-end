import { Test, TestingModule } from '@nestjs/testing';
import { FloorZoneController } from './floor-zone.controller';

describe('FloorZoneController', () => {
  let controller: FloorZoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloorZoneController],
    }).compile();

    controller = module.get<FloorZoneController>(FloorZoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
