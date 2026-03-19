//src/configuartion/merchant-payroll-rule/dto/update-merchant-payroll-rule.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateMerchantPayrollRuleDto } from './create-merchant-payroll-rule.dto';

export class UpdateMerchantPayrollRuleDto extends PartialType(
  CreateMerchantPayrollRuleDto,
) {}
