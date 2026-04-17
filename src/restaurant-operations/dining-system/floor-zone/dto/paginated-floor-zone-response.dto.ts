//src/restaurant-operations/dining-system/floor-zone/dto/paginated-floor-zone-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/dtos/success-response.dto';
import { FloorZoneResponseDto } from './floor-zone-response.dto';

export class PaginatedFloorZoneResponseDto extends SuccessResponse {
  @ApiProperty({
    description: 'List of Floor Zones',
    type: [FloorZoneResponseDto],
  })
  data: FloorZoneResponseDto[];

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
