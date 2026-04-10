//src/restaurant-operations/dining-system/floor-zone/dto/create-floor-zone.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFloorZoneDto {
  @ApiProperty({ example: 1, description: 'Identifier of the Merchant' })
  @IsInt()
  @IsNotEmpty()
  merchant: number;

  @ApiProperty({
    example: 'Main Dining Area',
    description: 'Name of the Floor Zone',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Blue',
    description: 'Color associated with the Floor Zone for UI representation',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    example: 1,
    description: 'Identifier of the Floor Plan related (if applicable)',
  })
  @IsInt()
  @IsNotEmpty()
  floorPlan: number;

  @ApiProperty({ example: 'active', enum: ['active', 'inactive'] })
  @IsString()
  @IsNotEmpty()
  @IsIn(['active', 'inactive'])
  status: string;
}
