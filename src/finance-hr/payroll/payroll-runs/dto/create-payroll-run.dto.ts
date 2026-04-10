import {
  IsNumber,
  IsPositive,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PayrollRunStatus } from '../constants/payroll-run-status.enum';

export class CreatePayrollRunDto {
  @ApiProperty({ example: 1, description: 'Company ID' })
  @IsNumber()
  @IsPositive()
  company_id: number;

  @ApiProperty({ example: 1, description: 'Merchant ID' })
  @IsNumber()
  @IsPositive()
  merchant_id: number;

  @ApiProperty({ example: '2024-01-01', description: 'Period start date' })
  @IsDateString()
  period_start: string;

  @ApiProperty({ example: '2024-01-15', description: 'Period end date' })
  @IsDateString()
  period_end: string;

  @ApiPropertyOptional({
    example: PayrollRunStatus.DRAFT,
    enum: PayrollRunStatus,
    description: 'Status (default: draft)',
    default: PayrollRunStatus.DRAFT,
  })
  @IsOptional()
  @IsEnum(PayrollRunStatus)
  status?: PayrollRunStatus;
}
