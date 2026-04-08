import { Test, TestingModule } from '@nestjs/testing';
import { FloorZoneService } from './floor-zone.service';

describe('FloorZoneService', () => {
  let service: FloorZoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FloorZoneService],
    }).compile();

    service = module.get<FloorZoneService>(FloorZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
