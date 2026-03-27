import { Module } from '@nestjs/common';
import { SuplierInvoicesModule } from './suplier-invoices/suplier-invoices.module';
import { SuplierInvoiceItemModule } from './suplier-invoice-item/suplier-invoice-item.module';
import { SupplierPaymentsModule } from './supplier-payments/supplier-payments.module';
import { SupplierPaymentItemsModule } from './supplier-payment-items/supplier-payment-items.module';
import { SupplierPaymentAllocationsModule } from './supplier_payment_allocations/supplier_payment_allocations.module';
import { SupplierCreditNotesModule } from './supplier-credit-notes/supplier-credit-notes.module';

@Module({
  imports: [
    SuplierInvoicesModule,
    SuplierInvoiceItemModule,
    SupplierPaymentsModule,
    SupplierPaymentItemsModule,
    SupplierPaymentAllocationsModule,
    SupplierCreditNotesModule,
  ],
  exports: [
    SuplierInvoicesModule,
    SuplierInvoiceItemModule,
    SupplierPaymentsModule,
    SupplierPaymentItemsModule,
    SupplierPaymentAllocationsModule,
    SupplierCreditNotesModule,
  ],
})
export class AcountPayableModule {}
