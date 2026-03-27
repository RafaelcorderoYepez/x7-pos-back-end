//src/core/configuration/merchant-payroll-rule/dto/paginated-merchant-payroll-rule-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/dtos/success-response.dto';
import { MerchantPayrollRuleResponseDto } from './merchant-payroll-rule-response.dto';

export class PaginatedMerchantPayrollRuleResponseDto extends SuccessResponse {
  @ApiProperty({
    description: 'List of Merchant Payroll Rules',
    type: [MerchantPayrollRuleResponseDto],
  })
  data: MerchantPayrollRuleResponseDto[];

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
