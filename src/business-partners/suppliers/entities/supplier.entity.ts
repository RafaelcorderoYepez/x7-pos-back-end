import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Product } from '../../../inventory/products-inventory/products/entities/product.entity';
import { PurchaseOrder } from '../../../inventory/products-inventory/purchase-order/entities/purchase-order.entity';

@Entity('supplier')
export class Supplier {
  @ApiProperty({ example: 1, description: 'Supplier ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'Company ID' })
  @Column({ type: 'int' })
  company_id: number;

  @ApiProperty({ example: 'Coca-Cola', description: 'Supplier name' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example: '12345678-9',
    description: 'Tax ID',
    required: false,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  tax_id?: string;

  @ApiProperty({
    example: 'supplier@example.com',
    description: 'Email',
    required: false,
  })
  @Column({ type: 'varchar', length: 150, nullable: true })
  email?: string;

  @ApiProperty({
    example: '+123456789',
    description: 'Phone number',
    required: false,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  phone?: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'Address',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  address?: string;

  @ApiProperty({ example: true, description: 'Whether the supplier is active' })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Creation date' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Last update date' })
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

  @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.supplier)
  purchaseOrders: PurchaseOrder[];
}
