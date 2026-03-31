import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { FinancialEngineModule } from './financial-engine/financial-engine.module';
import { BillingTransactionsModule } from './billing-transactions/billing-transactions.module';
import { BusinessPartnersModule } from './business-partners/business-partners.module';

@Module({
  controllers: [CoreController],
  providers: [CoreService],
  imports: [FinancialEngineModule, BillingTransactionsModule, BusinessPartnersModule],
})
export class CoreModule { }
