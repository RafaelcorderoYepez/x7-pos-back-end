import { Module } from '@nestjs/common';
import { CashDrawersModule } from './cash-drawers/cash-drawers.module';
import { CashDrawerHistoryModule } from './cash-drawer-history/cash-drawer-history.module';
import { CashTransactionsModule } from './cash-transactions/cash-transactions.module';

@Module({
  imports: [CashDrawersModule, CashDrawerHistoryModule, CashTransactionsModule],
  exports: [CashDrawersModule, CashDrawerHistoryModule, CashTransactionsModule],
})
export class CashdrawerModule {}
