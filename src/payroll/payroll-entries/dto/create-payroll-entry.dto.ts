import {
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePayrollEntryDto {
  @ApiProperty({ example: 1, description: 'Payroll run ID' })
  @IsNumber()
  @IsPositive()
  payroll_run_id: number;

  @ApiProperty({ example: 1, description: 'Collaborator ID' })
  @IsNumber()
  @IsPositive()
  collaborator_id: number;

  @ApiPropertyOptional({ example: 50000.00, description: 'Base pay', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  base_pay?: number;

  @ApiPropertyOptional({ example: 7500.00, description: 'Overtime pay', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  overtime_pay?: number;

  @ApiPropertyOptional({ example: 0, description: 'Double overtime pay', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  double_overtime_pay?: number;

  @ApiPropertyOptional({ example: 15000.00, description: 'Tips amount', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  tips_amount?: number;

  @ApiPropertyOptional({ example: 5000.00, description: 'Bonuses total', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bonuses?: number;

  @ApiPropertyOptional({ example: 2000.00, description: 'Deductions total', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  deductions?: number;

  @ApiPropertyOptional({ example: 75500.00, description: 'Gross total', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  gross_total?: number;

  @ApiPropertyOptional({ example: 12000.00, description: 'Tax total', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  tax_total?: number;

  @ApiPropertyOptional({ example: 63500.00, description: 'Net total', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  net_total?: number;
}
