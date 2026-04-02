import { PartialType } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';
import { KitchenStatus } from '../../orders/constants/kitchen-status.enum';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @ApiPropertyOptional({ enum: KitchenStatus })
  @IsOptional()
  @IsEnum(KitchenStatus)
  kitchenStatus?: KitchenStatus;
}
