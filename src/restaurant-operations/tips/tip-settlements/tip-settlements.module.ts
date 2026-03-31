import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipSettlementsService } from './tip-settlements.service';
import { TipSettlementsController } from './tip-settlements.controller';
import { TipSettlement } from './entities/tip-settlement.entity';
import { Collaborator } from '../../../hr/collaborators/entities/collaborator.entity';
import { Shift } from '../../shift/shifts/entities/shift.entity';
import { User } from '../../../platform-saas/users/entities/user.entity';
import { Merchant } from '../../../platform-saas/merchants/entities/merchant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TipSettlement,
      Collaborator,
      Shift,
      User,
      Merchant,
    ]),
  ],
  controllers: [TipSettlementsController],
  providers: [TipSettlementsService],
  exports: [TipSettlementsService],
})
export class TipSettlementsModule {}
