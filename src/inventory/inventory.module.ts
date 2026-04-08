import { Module } from '@nestjs/common';
import { BillingTransactionsModule } from '../core/billing-transactions/billing-transactions.module';
import { ProductsInventoryModule } from './products-inventory/products-inventory.module';

@Module({
  imports: [ProductsInventoryModule, BillingTransactionsModule],
})
export class InventoryModule { }
