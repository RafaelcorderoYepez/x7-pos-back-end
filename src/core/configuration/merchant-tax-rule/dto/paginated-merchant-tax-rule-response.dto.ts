//src/core/configuration/merchant-tax-rule/dto/paginated-merchant-tax-rule-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/dtos/success-response.dto';
import { MerchantTaxRuleResponseDto } from './merchant-tax-rule-response.dto';

export class PaginatedMerchantTaxRuleResponseDto extends SuccessResponse {
  @ApiProperty({
    description: 'List of Merchant Tax Rules',
    type: [MerchantTaxRuleResponseDto],
  })
  data: MerchantTaxRuleResponseDto[];

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
