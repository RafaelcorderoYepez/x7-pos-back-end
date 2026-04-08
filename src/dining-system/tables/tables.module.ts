import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { Merchant } from 'src/merchants/entities/merchant.entity';
import { IsUniqueField } from 'src/validators/is-unique-field.validator';
import { FloorPlan } from '../floor-plan/entity/floor-plan.entity';
import { FloorZone } from '../floor-zone/entity/floor-zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Table, Merchant, FloorPlan, FloorZone])],
  controllers: [TablesController],
  providers: [TablesService, IsUniqueField],
  exports: [IsUniqueField],
})
export class TablesModule {}
