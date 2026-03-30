import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { SuplierInvoiceItem } from './entities/suplier-invoice-item.entity';
import { SuplierInvoice } from '../suplier-invoices/entities/suplier-invoice.entity';
import { Product } from '../../inventory/products-inventory/products/entities/product.entity';
import { CreateSuplierInvoiceItemDto } from './dto/create-suplier-invoice-item.dto';
import { UpdateSuplierInvoiceItemDto } from './dto/update-suplier-invoice-item.dto';
import {
  GetSuplierInvoiceItemsQueryDto,
  SuplierInvoiceItemSortBy,
} from './dto/get-suplier-invoice-items-query.dto';
import {
  OneSuplierInvoiceItemResponseDto,
  SuplierInvoiceItemResponseDto,
} from './dto/suplier-invoice-item-response.dto';
import { PaginatedSuplierInvoiceItemsResponseDto } from './dto/paginated-suplier-invoice-items-response.dto';

@Injectable()
export class SuplierInvoiceItemService {
  constructor(
    @InjectRepository(SuplierInvoiceItem)
    private readonly itemRepo: Repository<SuplierInvoiceItem>,
    @InjectRepository(SuplierInvoice)
    private readonly invoiceRepo: Repository<SuplierInvoice>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  private toResponseDto(row: SuplierInvoiceItem): SuplierInvoiceItemResponseDto {
    return {
      id: row.id,
      invoice_id: row.invoice_id,
      product_id: row.product_id ?? null,
      description: row.description,
      quantity: Number(row.quantity),
      unit_price: Number(row.unit_price),
      line_subtotal: Number(row.line_subtotal),
      tax_amount: Number(row.tax_amount),
      line_total: Number(row.line_total),
    };
  }

  private async assertInvoiceExists(invoiceId: number): Promise<SuplierInvoice> {
    const inv = await this.invoiceRepo.findOne({
      where: { id: invoiceId, deleted_at: IsNull() },
    });
    if (!inv) {
      throw new NotFoundException(
        `Supplier invoice with ID ${invoiceId} not found`,
      );
    }
    return inv;
  }

  private async assertProductIfProvided(
    productId?: number | null,
  ): Promise<void> {
    if (productId == null) return;
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  }

  async create(
    dto: CreateSuplierInvoiceItemDto,
  ): Promise<OneSuplierInvoiceItemResponseDto> {
    await this.assertInvoiceExists(dto.invoice_id);
    await this.assertProductIfProvided(dto.product_id);

    const row = this.itemRepo.create({
      invoice_id: dto.invoice_id,
      description: dto.description,
      quantity: dto.quantity,
      unit_price: dto.unit_price,
      line_subtotal: dto.line_subtotal,
      tax_amount: dto.tax_amount ?? 0,
      line_total: dto.line_total,
      ...(dto.product_id != null ? { product_id: dto.product_id } : {}),
    });
    const saved = await this.itemRepo.save(row);
    return {
      statusCode: 201,
      message: 'Supplier invoice item created successfully',
      data: this.toResponseDto(saved),
    };
  }

  async findAll(
    query: GetSuplierInvoiceItemsQueryDto,
  ): Promise<PaginatedSuplierInvoiceItemsResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ?? SuplierInvoiceItemSortBy.ID;
    const sortOrder = query.sortOrder ?? 'DESC';

    const qb = this.itemRepo
      .createQueryBuilder('sii')
      .where('sii.deleted_at IS NULL');

    if (query.invoice_id != null) {
      qb.andWhere('sii.invoice_id = :invoiceId', {
        invoiceId: query.invoice_id,
      });
    }
    if (query.product_id != null) {
      qb.andWhere('sii.product_id = :productId', {
        productId: query.product_id,
      });
    }

    const orderColumn =
      sortBy === SuplierInvoiceItemSortBy.DESCRIPTION
        ? 'sii.description'
        : sortBy === SuplierInvoiceItemSortBy.LINE_TOTAL
          ? 'sii.line_total'
          : sortBy === SuplierInvoiceItemSortBy.QUANTITY
            ? 'sii.quantity'
            : 'sii.id';

    qb.orderBy(orderColumn, sortOrder);

    const total = await qb.getCount();
    const items = await qb.skip(skip).take(limit).getMany();
    const totalPages = Math.ceil(total / limit);

    return {
      statusCode: 200,
      message: 'Supplier invoice items retrieved successfully',
      data: items.map((i) => this.toResponseDto(i)),
      paginationMeta: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(id: number): Promise<OneSuplierInvoiceItemResponseDto> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid supplier invoice item ID');
    }

    const row = await this.itemRepo.findOne({
      where: { id, deleted_at: IsNull() },
    });
    if (!row) {
      throw new NotFoundException(
        `Supplier invoice item with ID ${id} not found`,
      );
    }

    return {
      statusCode: 200,
      message: 'Supplier invoice item retrieved successfully',
      data: this.toResponseDto(row),
    };
  }

  async update(
    id: number,
    dto: UpdateSuplierInvoiceItemDto,
  ): Promise<OneSuplierInvoiceItemResponseDto> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid supplier invoice item ID');
    }

    const row = await this.itemRepo.findOne({
      where: { id, deleted_at: IsNull() },
    });
    if (!row) {
      throw new NotFoundException(
        `Supplier invoice item with ID ${id} not found`,
      );
    }

    if (dto.invoice_id != null) {
      await this.assertInvoiceExists(dto.invoice_id);
      row.invoice_id = dto.invoice_id;
    }
    if (dto.product_id !== undefined) {
      await this.assertProductIfProvided(dto.product_id ?? undefined);
      row.product_id = dto.product_id ?? null;
    }
    if (dto.description != null) row.description = dto.description;
    if (dto.quantity != null) row.quantity = dto.quantity as any;
    if (dto.unit_price != null) row.unit_price = dto.unit_price as any;
    if (dto.line_subtotal != null) row.line_subtotal = dto.line_subtotal as any;
    if (dto.tax_amount != null) row.tax_amount = dto.tax_amount as any;
    if (dto.line_total != null) row.line_total = dto.line_total as any;

    const saved = await this.itemRepo.save(row);
    return {
      statusCode: 200,
      message: 'Supplier invoice item updated successfully',
      data: this.toResponseDto(saved),
    };
  }

  async remove(id: number): Promise<OneSuplierInvoiceItemResponseDto> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid supplier invoice item ID');
    }

    const row = await this.itemRepo.findOne({
      where: { id, deleted_at: IsNull() },
    });
    if (!row) {
      throw new NotFoundException(
        `Supplier invoice item with ID ${id} not found`,
      );
    }

    row.deleted_at = new Date();
    await this.itemRepo.save(row);

    return {
      statusCode: 200,
      message: 'Supplier invoice item deleted successfully',
      data: this.toResponseDto(row),
    };
  }
}
