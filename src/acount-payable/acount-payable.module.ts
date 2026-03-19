import { Module } from '@nestjs/common';
import { SuplierInvoicesModule } from './suplier-invoices/suplier-invoices.module';

@Module({
  imports: [SuplierInvoicesModule],
  exports: [SuplierInvoicesModule],
})
export class AcountPayableModule {}
