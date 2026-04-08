//src/dining-system/floor-zone/dto/update-floor-zone.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateFloorZoneDto } from './create-floor-zone.dto';

export class UpdateFloorZoneDto extends PartialType(CreateFloorZoneDto) {}
