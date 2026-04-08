import {
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTableDto {
  @ApiPropertyOptional({
    example: 'A1',
    description: 'Table number or identifier',
  })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiPropertyOptional({
    example: 4,
    description: 'Seating capacity (minimum 1 person)',
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional({ example: 'available', description: 'Table status' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({
    example: 'Near window',
    description: 'Location description',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    example: 90,
    description: 'Rotation for the table in degrees (0-360)',
  })
  @IsNumber()
  @Min(0)
  @Max(360)
  @IsOptional()
  rotation?: number;

  @ApiPropertyOptional({
    example: 'Circle',
    description: 'Shape of the table (e.g., Circle, Square, Rectangle)',
  })
  @IsString()
  @IsOptional()
  @IsIn(['Circle', 'Square', 'Rectangle'])
  shape?: string;

  @ApiPropertyOptional({
    example: 100,
    description: 'X coordinate for the table position on the floor plan',
  })
  @IsNumber()
  @IsOptional()
  pos_x?: number;

  @ApiPropertyOptional({
    example: 100,
    description: 'Y coordinate for the table position on the floor plan',
  })
  @IsNumber()
  @IsOptional()
  pos_y?: number;

  @ApiPropertyOptional({ example: 1, description: 'Floor Zone ID' })
  @IsNumber()
  @IsOptional()
  floorZone: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  floorPlan: number;

  @ApiPropertyOptional({ example: 1, description: 'Table Group ID (optional)' })
  @IsNumber()
  @IsOptional()
  parent_table_id?: number;
}
