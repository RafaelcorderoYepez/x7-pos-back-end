//src/restaurant-operations/dining-system/floor-plan/dto/update-floor-plan.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateFloorPlanDto } from './create-floor-plan.dto';

export class UpdateFloorPlanDto extends PartialType(CreateFloorPlanDto) {}
