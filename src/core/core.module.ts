import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { FinancialEngineModule } from './financial-engine/financial-engine.module';
import { BillingTransactionsModule } from './billing-transactions/billing-transactions.module';

@Module({
  controllers: [CoreController],
  providers: [CoreService],
  imports: [FinancialEngineModule, BillingTransactionsModule],
})
export class CoreModule { }
