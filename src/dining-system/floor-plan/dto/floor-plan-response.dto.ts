//src/dining-system/floor-plan/dto/floor-plan-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/dtos/success-response.dto';
import { Merchant } from 'src/platform-saas/merchants/entities/merchant.entity';

export class FloorPlanResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the Floor Plan',
  })
  id: number;

  @ApiProperty({
    example: 'Main Floor Plan',
    description: 'Name of the Floor Plan',
  })
  name: string;

  @ApiProperty({
    example: 500,
    description: 'Width of the floor plan in pixels',
  })
  width: number;

  @ApiProperty({
    example: 300,
    description: 'Height of the floor plan in pixels',
  })
  height: number;

  @ApiProperty({
    example: 1,
    description: 'Identifier of the Merchant',
  })
  merchant: Merchant;

  @ApiProperty({
    example: 'active',
    enum: ['active', 'inactive'],
  })
  status: string;
}

export class OneFloorPlanResponseDto extends SuccessResponse {
  @ApiProperty()
  data: FloorPlanResponseDto;
}

export class AllFloorPlanResponseDto extends SuccessResponse {
  @ApiProperty()
  data: FloorPlanResponseDto[];
}
