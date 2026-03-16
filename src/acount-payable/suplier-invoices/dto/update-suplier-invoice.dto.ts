import { PartialType } from '@nestjs/swagger';
import { CreateSuplierInvoiceDto } from './create-suplier-invoice.dto';

export class UpdateSuplierInvoiceDto extends PartialType(CreateSuplierInvoiceDto) {}
