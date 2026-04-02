import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { Merchant } from '../../../merchants/entities/merchant.entity';
import { Table } from '../../../tables/entities/table.entity';
import { Collaborator } from '../../../hr/collaborators/entities/collaborator.entity';
import { MerchantSubscription } from '../../../subscriptions/merchant-subscriptions/entities/merchant-subscription.entity';
import { Customer } from 'src/business-partners/customers/entities/customer.entity';
import { LoyaltyRewardsRedemtion } from 'src/loyalty/loyalty-rewards-redemtions/entities/loyalty-rewards-redemtion.entity';
import { LoyaltyCoupon } from 'src/loyalty/loyalty-coupons/entities/loyalty-coupon.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
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
  exports: [OrdersService],
})
export class OrdersModule { }
