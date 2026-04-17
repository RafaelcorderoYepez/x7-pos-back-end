//src/restaurant-operations/dining-system/floor-plan/dto/paginated-floor-plan-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/dtos/success-response.dto';
import { FloorPlanResponseDto } from './floor-plan-response.dto';

export class PaginatedFloorPlanResponseDto extends SuccessResponse {
  @ApiProperty({
    description: 'List of Floor Plans',
    type: [FloorPlanResponseDto],
  })
  data: FloorPlanResponseDto[];

  @ApiProperty({
    description: 'Pagination info',
    example: {
      total: 42,
      page: 1,
      limit: 10,
      totalPages: 5,
    },
  })
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
