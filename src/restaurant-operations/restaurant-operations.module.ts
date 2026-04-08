import { Module } from '@nestjs/common';
import { ShiftModule } from './shift/shift.module';
import { TipsModule } from './tips/tips.module';
import { CashdrawerModule } from './cashdrawer/cashdrawer.module';
import { KitchenDisplaySystemModule } from './kitchen-display-system/kitchen-display-system.module';

@Module({
  imports: [ShiftModule, TipsModule, CashdrawerModule, KitchenDisplaySystemModule],
  controllers: [],
  providers: [],
  exports: [ShiftModule, TipsModule, CashdrawerModule, KitchenDisplaySystemModule],
})
export class RestaurantOperationsModule { }
