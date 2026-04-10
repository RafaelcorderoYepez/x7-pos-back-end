import { Module } from '@nestjs/common';
import { LoyaltyProgramsModule } from './loyalty-programs/loyalty-programs.module';
import { LoyaltyTierModule } from './loyalty-tier/loyalty-tier.module';
import { LoyaltyCustomerModule } from './loyalty-customer/loyalty-customer.module';
import { LoyaltyPointsTransactionModule } from './loyalty-points-transaction/loyalty-points-transaction.module';
import { LoyaltyRewardModule } from './loyalty-reward/loyalty-reward.module';
import { LoyaltyRewardsRedemtionsModule } from './loyalty-rewards-redemtions/loyalty-rewards-redemtions.module';
import { LoyaltyCouponsModule } from './loyalty-coupons/loyalty-coupons.module';

@Module({
  imports: [
    LoyaltyProgramsModule,
    LoyaltyTierModule,
    LoyaltyCustomerModule,
    LoyaltyPointsTransactionModule,
    LoyaltyRewardModule,
    LoyaltyRewardsRedemtionsModule,
    LoyaltyCouponsModule,
  ],
})
export class LoyaltyModule { }
