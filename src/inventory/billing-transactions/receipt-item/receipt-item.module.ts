import { Module } from '@nestjs/common';
import { ReceiptItemService } from './receipt-item.service';
import { ReceiptItemController } from './receipt-item.controller';

@Module({
  controllers: [ReceiptItemController],
  providers: [ReceiptItemService],
})
export class ReceiptItemModule {}
