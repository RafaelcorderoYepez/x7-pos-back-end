import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from '../../../common/dtos/success-response.dto';
import { SupplierInvoiceStatus } from '../constants/supplier-invoice-status.enum';

export class SuplierInvoiceResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 10 })
  company_id: number;

  @ApiProperty({ example: 5 })
  supplier_id: number;

  @ApiProperty({ example: 'INV-4567' })
  invoice_number: string;

  @ApiProperty({ example: '2025-03-01' })
  invoice_date: string;

  @ApiProperty({ example: '2025-03-31' })
  due_date: string;

  @ApiProperty({ example: 1000.0 })
  subtotal: number;

  @ApiProperty({ example: 190.0 })
  tax_total: number;

  @ApiProperty({ example: 1190.0 })
  total_amount: number;

  @ApiProperty({ example: 400.0 })
  paid_amount: number;

  @ApiProperty({ example: 790.0 })
  balance_due: number;

  @ApiProperty({ enum: SupplierInvoiceStatus })
  status: SupplierInvoiceStatus;

  @ApiProperty({ example: 'Optional notes', nullable: true })
  notes: string | null;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}

export class OneSuplierInvoiceResponseDto extends SuccessResponse {
  @ApiProperty({ type: SuplierInvoiceResponseDto })
  data: SuplierInvoiceResponseDto;
}
