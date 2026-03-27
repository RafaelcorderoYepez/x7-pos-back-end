//src/core/configuartion/merchant-tax-rule/dto/update-merchant-tax-rule.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateMerchantTaxRuleDto } from './create-merchant-tax-rule.dto';

export class UpdateMerchantTaxRuleDto extends PartialType(
  CreateMerchantTaxRuleDto,
) {}
