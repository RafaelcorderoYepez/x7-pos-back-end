import { Module } from '@nestjs/common';
import { BusinessPartnersService } from './business-partners.service';
import { BusinessPartnersController } from './business-partners.controller';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [SuppliersModule, CustomersModule],
  controllers: [BusinessPartnersController],
  providers: [BusinessPartnersService],
  exports: [SuppliersModule, CustomersModule],
})
export class BusinessPartnersModule { }
