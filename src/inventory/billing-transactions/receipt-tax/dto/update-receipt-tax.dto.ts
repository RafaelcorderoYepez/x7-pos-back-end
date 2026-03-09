import { PartialType } from '@nestjs/swagger';
import { CreateReceiptTaxDto } from './create-receipt-tax.dto';

export class UpdateReceiptTaxDto extends PartialType(CreateReceiptTaxDto) {}
