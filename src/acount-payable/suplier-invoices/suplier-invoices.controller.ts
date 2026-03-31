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
import { SuplierInvoicesService } from './suplier-invoices.service';
import { CreateSuplierInvoiceDto } from './dto/create-suplier-invoice.dto';
import { UpdateSuplierInvoiceDto } from './dto/update-suplier-invoice.dto';
import { GetSuplierInvoicesQueryDto } from './dto/get-suplier-invoices-query.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiExtraModels,
} from '@nestjs/swagger';
import { OneSuplierInvoiceResponseDto } from './dto/suplier-invoice-response.dto';
import { PaginatedSuplierInvoicesResponseDto } from './dto/paginated-suplier-invoices-response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Scopes } from '../../auth/decorators/scopes.decorator';
import { UserRole } from '../../platform-saas/users/constants/role.enum';
import { Scope } from '../../platform-saas/users/constants/scope.enum';
import { SupplierInvoiceStatus } from './constants/supplier-invoice-status.enum';
import { SuplierInvoiceSortBy } from './dto/get-suplier-invoices-query.dto';

@ApiTags('Supplier invoices (Account payable)')
@ApiBearerAuth()
@Controller('supplier-invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiExtraModels(OneSuplierInvoiceResponseDto, PaginatedSuplierInvoicesResponseDto)
export class SuplierInvoicesController {
  constructor(private readonly suplierInvoicesService: SuplierInvoicesService) {}

  @Post()
  @Roles(UserRole.PORTAL_ADMIN, UserRole.MERCHANT_ADMIN)
  @Scopes(
    Scope.ADMIN_PORTAL,
    Scope.MERCHANT_WEB,
    Scope.MERCHANT_ANDROID,
    Scope.MERCHANT_IOS,
    Scope.MERCHANT_CLOVER,
  )
  @ApiOperation({ summary: 'Create supplier invoice' })
  @ApiBody({ type: CreateSuplierInvoiceDto })
  @ApiCreatedResponse({
    description: 'Supplier invoice created successfully',
    type: OneSuplierInvoiceResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input or validation error' })
  @ApiNotFoundResponse({ description: 'Company or supplier not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async create(
    @Body() dto: CreateSuplierInvoiceDto,
  ): Promise<OneSuplierInvoiceResponseDto> {
    return this.suplierInvoicesService.create(dto);
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
  @ApiOperation({ summary: 'Get all supplier invoices (paginated)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'company_id', required: false })
  @ApiQuery({ name: 'supplier_id', required: false })
  @ApiQuery({ name: 'status', required: false, enum: SupplierInvoiceStatus })
  @ApiQuery({ name: 'sortBy', required: false, enum: SuplierInvoiceSortBy })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })
  @ApiOkResponse({
    description: 'Supplier invoices retrieved successfully',
    type: PaginatedSuplierInvoicesResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findAll(
    @Query() query: GetSuplierInvoicesQueryDto,
  ): Promise<PaginatedSuplierInvoicesResponseDto> {
    return this.suplierInvoicesService.findAll(query);
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
  @ApiOperation({ summary: 'Get supplier invoice by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Supplier invoice retrieved successfully',
    type: OneSuplierInvoiceResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Supplier invoice not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OneSuplierInvoiceResponseDto> {
    return this.suplierInvoicesService.findOne(id);
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
  @ApiOperation({ summary: 'Update supplier invoice' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateSuplierInvoiceDto })
  @ApiOkResponse({
    description: 'Supplier invoice updated successfully',
    type: OneSuplierInvoiceResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Supplier invoice, company or supplier not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSuplierInvoiceDto,
  ): Promise<OneSuplierInvoiceResponseDto> {
    return this.suplierInvoicesService.update(id, dto);
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
  @ApiOperation({ summary: 'Delete supplier invoice (logical delete)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Supplier invoice deleted successfully',
    type: OneSuplierInvoiceResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Supplier invoice not found' })
  @ApiBadRequestResponse({ description: 'Invalid ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OneSuplierInvoiceResponseDto> {
    return this.suplierInvoicesService.remove(id);
  }
}
