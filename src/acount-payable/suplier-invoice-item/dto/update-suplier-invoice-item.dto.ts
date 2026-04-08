import { PartialType } from '@nestjs/swagger';
import { CreateSuplierInvoiceItemDto } from './create-suplier-invoice-item.dto';

export class UpdateSuplierInvoiceItemDto extends PartialType(CreateSuplierInvoiceItemDto) {}
