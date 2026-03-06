import { Module } from '@nestjs/common';
import { BillingTransactionsService } from './billing-transactions.service';
import { BillingTransactionsController } from './billing-transactions.controller';
import { ReceiptsModule } from './receipts/receipts.module';
import { ReceiptItemModule } from './receipt-item/receipt-item.module';

@Module({
    imports: [ReceiptsModule, ReceiptItemModule],
    controllers: [BillingTransactionsController],
    providers: [BillingTransactionsService],
})
export class BillingTransactionsModule { }
