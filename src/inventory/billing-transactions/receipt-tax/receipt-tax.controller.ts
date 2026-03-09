import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReceiptTaxService } from './receipt-tax.service';
import { CreateReceiptTaxDto } from './dto/create-receipt-tax.dto';
import { UpdateReceiptTaxDto } from './dto/update-receipt-tax.dto';

@Controller('receipt-tax')
export class ReceiptTaxController {
  constructor(private readonly receiptTaxService: ReceiptTaxService) {}

  @Post()
  create(@Body() createReceiptTaxDto: CreateReceiptTaxDto) {
    return this.receiptTaxService.create(createReceiptTaxDto);
  }

  @Get()
  findAll() {
    return this.receiptTaxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptTaxService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiptTaxDto: UpdateReceiptTaxDto) {
    return this.receiptTaxService.update(+id, updateReceiptTaxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptTaxService.remove(+id);
  }
}
