import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierPaymentsService } from './supplier-payments.service';
import { SupplierPaymentsController } from './supplier-payments.controller';
import { SupplierPayment } from './entities/supplier-payment.entity';
import { Company } from '../../companies/entities/company.entity';
import { Supplier } from '../../inventory/products-inventory/suppliers/entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierPayment, Company, Supplier])],
  controllers: [SupplierPaymentsController],
  providers: [SupplierPaymentsService],
  exports: [SupplierPaymentsService],
})
export class SupplierPaymentsModule {}
