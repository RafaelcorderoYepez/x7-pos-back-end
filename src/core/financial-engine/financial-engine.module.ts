import { Module } from '@nestjs/common';
import { FinancialEngineService } from './financial-engine.service';
import { FinancialEngineController } from './financial-engine.controller';
import { JournalEntryModule } from './journal-entry/journal-entry.module';
import { LedgerAccountsModule } from './ledger-accounts/ledger-accounts.module';
import { JournalEntryLineModule } from './journal-entry-line/journal-entry-line.module';

@Module({
  controllers: [FinancialEngineController],
  providers: [FinancialEngineService],
  imports: [JournalEntryModule, LedgerAccountsModule, JournalEntryLineModule],
})
export class FinancialEngineModule { }
