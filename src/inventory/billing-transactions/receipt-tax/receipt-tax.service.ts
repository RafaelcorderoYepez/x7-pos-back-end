import { Injectable } from '@nestjs/common';
import { CreateReceiptTaxDto } from './dto/create-receipt-tax.dto';
import { UpdateReceiptTaxDto } from './dto/update-receipt-tax.dto';

@Injectable()
export class ReceiptTaxService {
  create(createReceiptTaxDto: CreateReceiptTaxDto) {
    return 'This action adds a new receiptTax';
  }

  findAll() {
    return `This action returns all receiptTax`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receiptTax`;
  }

  update(id: number, updateReceiptTaxDto: UpdateReceiptTaxDto) {
    return `This action updates a #${id} receiptTax`;
  }

  remove(id: number) {
    return `This action removes a #${id} receiptTax`;
  }
}
