//src/core/configuration/merchant-payroll-rule/merchant-payroll-rule.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Configuration } from '../entity/configuration-entity';
import { User } from 'src/users/entities/user.entity';
import { MerchantPayrollRule } from './entity/merchant-payroll-rule.entity';
import { MerchantPayrollRuleController } from './merchant-payroll-rule.controller';
import { MerchantPayrollRuleService } from './merchant-payroll-rule.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      MerchantPayrollRule,
      Configuration,
      User,
    ]),
  ],
  controllers: [MerchantPayrollRuleController],
  providers: [MerchantPayrollRuleService],
  exports: [MerchantPayrollRuleService],
})
export class MerchantPayrollRuleModule {}
