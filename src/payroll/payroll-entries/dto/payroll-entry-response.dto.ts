import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from '../../../common/dtos/success-response.dto';

export class PayrollEntryResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @ApiProperty({ example: 1, description: 'Payroll run ID' })
  payroll_run_id: number;

  @ApiProperty({ example: 1, description: 'Collaborator ID' })
  collaborator_id: number;

  @ApiProperty({ example: 50000.00 })
  base_pay: number;

  @ApiProperty({ example: 7500.00 })
  overtime_pay: number;

  @ApiProperty({ example: 0 })
  double_overtime_pay: number;

  @ApiProperty({ example: 15000.00 })
  tips_amount: number;

  @ApiProperty({ example: 5000.00 })
  bonuses: number;

  @ApiProperty({ example: 2000.00 })
  deductions: number;

  @ApiProperty({ example: 75500.00 })
  gross_total: number;

  @ApiProperty({ example: 12000.00 })
  tax_total: number;

  @ApiProperty({ example: 63500.00 })
  net_total: number;

  @ApiProperty({ description: 'Creation timestamp' })
  created_at: string;
}

export class OnePayrollEntryResponseDto extends SuccessResponse {
  @ApiProperty({ type: PayrollEntryResponseDto })
  data: PayrollEntryResponseDto;
}
