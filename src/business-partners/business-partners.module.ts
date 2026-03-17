import { Module } from '@nestjs/common';
import { BusinessPartnersService } from './business-partners.service';
import { BusinessPartnersController } from './business-partners.controller';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [SuppliersModule],
  controllers: [BusinessPartnersController],
  providers: [BusinessPartnersService],
  exports: [SuppliersModule],
})
export class BusinessPartnersModule { }
