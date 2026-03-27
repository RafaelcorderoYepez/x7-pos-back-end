import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiQuery,
} from '@nestjs/swagger';
import { SuplierInvoiceItemService } from './suplier-invoice-item.service';
import { CreateSuplierInvoiceItemDto } from './dto/create-suplier-invoice-item.dto';
import { UpdateSuplierInvoiceItemDto } from './dto/update-suplier-invoice-item.dto';
import {
  GetSuplierInvoiceItemsQueryDto,
  SuplierInvoiceItemSortBy,
} from './dto/get-suplier-invoice-items-query.dto';
import { OneSuplierInvoiceItemResponseDto } from './dto/suplier-invoice-item-response.dto';
import { PaginatedSuplierInvoiceItemsResponseDto } from './dto/paginated-suplier-invoice-items-response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Scopes } from '../../auth/decorators/scopes.decorator';
import { UserRole } from '../../users/constants/role.enum';
import { Scope } from '../../users/constants/scope.enum';

@ApiTags('Supplier invoice items (Account payable)')
@ApiBearerAuth()
@Controller('supplier-invoice-items')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiExtraModels(
  OneSuplierInvoiceItemResponseDto,
  PaginatedSuplierInvoiceItemsResponseDto,
)
export class SuplierInvoiceItemController {
  constructor(
    private readonly suplierInvoiceItemService: SuplierInvoiceItemService,
  ) {}

  @Post()
  @Roles(UserRole.PORTAL_ADMIN, UserRole.MERCHANT_ADMIN)
  @Scopes(
    Scope.ADMIN_PORTAL,
    Scope.MERCHANT_WEB,
    Scope.MERCHANT_ANDROID,
    Scope.MERCHANT_IOS,
    Scope.MERCHANT_CLOVER,
  )
  @ApiOperation({ summary: 'Create supplier invoice line item' })
  @ApiBody({ type: CreateSuplierInvoiceItemDto })
  @ApiCreatedResponse({
    description: 'Supplier invoice item created successfully',
    type: OneSuplierInvoiceItemResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Invoice or product not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async create(
    @Body() dto: CreateSuplierInvoiceItemDto,
  ): Promise<OneSuplierInvoiceItemResponseDto> {
    return this.suplierInvoiceItemService.create(dto);
  }

  @Get()
  @Roles(UserRole.PORTAL_ADMIN, UserRole.MERCHANT_ADMIN)
  @Scopes(
    Scope.ADMIN_PORTAL,
    Scope.MERCHANT_WEB,
    Scope.MERCHANT_ANDROID,
    Scope.MERCHANT_IOS,
    Scope.MERCHANT_CLOVER,
  )
  @ApiOperation({ summary: 'List supplier invoice items (paginated)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'invoice_id', required: false })
  @ApiQuery({ name: 'product_id', required: false })
  @ApiQuery({ name: 'sortBy', required: false, enum: SuplierInvoiceItemSortBy })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })
  @ApiOkResponse({
    description: 'Supplier invoice items retrieved successfully',
    type: PaginatedSuplierInvoiceItemsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findAll(
    @Query() query: GetSuplierInvoiceItemsQueryDto,
  ): Promise<PaginatedSuplierInvoiceItemsResponseDto> {
    return this.suplierInvoiceItemService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.PORTAL_ADMIN, UserRole.MERCHANT_ADMIN)
  @Scopes(
    Scope.ADMIN_PORTAL,
    Scope.MERCHANT_WEB,
    Scope.MERCHANT_ANDROID,
    Scope.MERCHANT_IOS,
    Scope.MERCHANT_CLOVER,
  )
  @ApiOperation({ summary: 'Get supplier invoice item by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Supplier invoice item retrieved successfully',
    type: OneSuplierInvoiceItemResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OneSuplierInvoiceItemResponseDto> {
    return this.suplierInvoiceItemService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.PORTAL_ADMIN, UserRole.MERCHANT_ADMIN)
  @Scopes(
    Scope.ADMIN_PORTAL,
    Scope.MERCHANT_WEB,
    Scope.MERCHANT_ANDROID,
    Scope.MERCHANT_IOS,
    Scope.MERCHANT_CLOVER,
  )
  @ApiOperation({ summary: 'Update supplier invoice item' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateSuplierInvoiceItemDto })
  @ApiOkResponse({
    description: 'Supplier invoice item updated successfully',
    type: OneSuplierInvoiceItemResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSuplierInvoiceItemDto,
  ): Promise<OneSuplierInvoiceItemResponseDto> {
    return this.suplierInvoiceItemService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.PORTAL_ADMIN, UserRole.MERCHANT_ADMIN)
  @Scopes(
    Scope.ADMIN_PORTAL,
    Scope.MERCHANT_WEB,
    Scope.MERCHANT_ANDROID,
    Scope.MERCHANT_IOS,
    Scope.MERCHANT_CLOVER,
  )
  @ApiOperation({ summary: 'Delete supplier invoice item (logical delete)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Supplier invoice item deleted successfully',
    type: OneSuplierInvoiceItemResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OneSuplierInvoiceItemResponseDto> {
    return this.suplierInvoiceItemService.remove(id);
  }
}
