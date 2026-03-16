import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuplierInvoicesService } from './suplier-invoices.service';
import { SuplierInvoicesController } from './suplier-invoices.controller';
import { SuplierInvoice } from './entities/suplier-invoice.entity';
import { Company } from '../../companies/entities/company.entity';
import { Supplier } from '../../products-inventory/suppliers/entities/supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuplierInvoice, Company, Supplier]),
  ],
  controllers: [SuplierInvoicesController],
  providers: [SuplierInvoicesService],
  exports: [SuplierInvoicesService],
})
export class SuplierInvoicesModule {}
