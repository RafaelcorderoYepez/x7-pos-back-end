import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierCreditNotesService } from './supplier-credit-notes.service';
import { SupplierCreditNotesController } from './supplier-credit-notes.controller';
import { SupplierCreditNote } from './entities/supplier-credit-note.entity';
import { Company } from '../../companies/entities/company.entity';
import { Supplier } from '../../business-partners/suppliers/entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierCreditNote, Company, Supplier])],
  controllers: [SupplierCreditNotesController],
  providers: [SupplierCreditNotesService],
  exports: [SupplierCreditNotesService],
})
export class SupplierCreditNotesModule {}
