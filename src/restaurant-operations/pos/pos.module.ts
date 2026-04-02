import { Module } from '@nestjs/common';
import { OrderItemModule } from './order-item/order-item.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [OrdersModule, OrderItemModule],
  exports: [OrdersModule, OrderItemModule],
})
export class PosModule {}
