import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from '../../../common/dtos/success-response.dto';
import { PayrollRunStatus } from '../constants/payroll-run-status.enum';

export class PayrollRunResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id: number;

  @ApiProperty({ example: 1, description: 'Company ID' })
  company_id: number;

  @ApiProperty({ example: 1, description: 'Merchant ID' })
  merchant_id: number;

  @ApiProperty({ example: '2024-01-01', description: 'Period start date' })
  period_start: string;

  @ApiProperty({ example: '2024-01-15', description: 'Period end date' })
  period_end: string;

  @ApiProperty({ example: PayrollRunStatus.DRAFT, enum: PayrollRunStatus })
  status: PayrollRunStatus;

  @ApiProperty({ description: 'Creation timestamp' })
  created_at: string;

  @ApiProperty({ description: 'Approval timestamp', nullable: true })
  approved_at: string | null;
}

export class OnePayrollRunResponseDto extends SuccessResponse {
  @ApiProperty({ type: PayrollRunResponseDto })
  data: PayrollRunResponseDto;
}
