import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplierInvoiceItemService } from './suplier-invoice-item.service';
import { SuplierInvoiceItemController } from './suplier-invoice-item.controller';
import { SuplierInvoiceItem } from './entities/suplier-invoice-item.entity';
import { SuplierInvoice } from '../suplier-invoices/entities/suplier-invoice.entity';
import { Product } from '../../inventory/products-inventory/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuplierInvoiceItem, SuplierInvoice, Product]),
  ],
  controllers: [SuplierInvoiceItemController],
  providers: [SuplierInvoiceItemService],
  exports: [SuplierInvoiceItemService],
})
export class SuplierInvoiceItemModule {}
