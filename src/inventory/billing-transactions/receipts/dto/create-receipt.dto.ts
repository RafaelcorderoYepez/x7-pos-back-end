import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateReceiptDto {
  @ApiProperty({ example: 200, description: 'Order ID associated to the receipt' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  orderId: number;

  @ApiProperty({ example: 'invoice', description: 'Type of receipt' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  type: string;

  @ApiProperty({
    example: '{"tax_id": "12345678", "fiscal_number": "ABC123"}',
    description: 'Fiscal data in JSON format',
    required: false,
  })
  @IsString()
  @IsOptional()
  fiscalData?: string;

  @ApiProperty({ example: 100.0, description: 'Sum of all item subtotals before tax and discount', default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  subtotal?: number;

  @ApiProperty({ example: 19.0, description: 'Total tax amount across all receipt taxes', default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  totalTax?: number;

  @ApiProperty({ example: 5.0, description: 'Total discount amount across all receipt items', default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  totalDiscount?: number;

  @ApiProperty({ example: 114.0, description: 'Grand total = subtotal + total_tax - total_discount', default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  grandTotal?: number;

  @ApiProperty({ example: 'USD', description: 'Currency code (ISO 4217)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  currency: string;
}
