import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptTaxService } from './receipt-tax.service';
import { ReceiptTaxController } from './receipt-tax.controller';
import { ReceiptTax } from './entities/receipt-tax.entity';
import { Receipt } from '../receipts/entities/receipt.entity';
import { ReceiptItem } from '../receipt-item/entities/receipt-item.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReceiptTax, Receipt, ReceiptItem, Order])],
  controllers: [ReceiptTaxController],
  providers: [ReceiptTaxService],
  exports: [ReceiptTaxService],
})
export class ReceiptTaxModule { }
