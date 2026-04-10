import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { Merchant } from '../platform-saas/merchants/entities/merchant.entity';
import { Table } from 'src/dining-system/tables/entities/table.entity';
import { Collaborator } from 'src/finance-hr/hr/collaborators/entities/collaborator.entity';
import { MerchantSubscription } from '../platform-saas/subscriptions/merchant-subscriptions/entities/merchant-subscription.entity';
import { Customer } from 'src/core/business-partners/customers/entities/customer.entity';
import { LoyaltyRewardsRedemtion } from 'src/growth/loyalty/loyalty-rewards-redemtions/entities/loyalty-rewards-redemtion.entity';
import { LoyaltyCoupon } from 'src/growth/loyalty/loyalty-coupons/entities/loyalty-coupon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Merchant,
      Table,
      Collaborator,
      MerchantSubscription,
      Customer,
      LoyaltyRewardsRedemtion,
      LoyaltyCoupon,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
