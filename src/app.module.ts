// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AcountPayableModule } from './acount-payable/acount-payable.module';
import { ApplicationsModule } from './subscriptions/applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { CashDrawerHistoryModule } from './cashdrawer/cash-drawer-history/cash-drawer-history.module';
import { CashDrawersModule } from './cashdrawer/cash-drawers/cash-drawers.module';
import { CashTransactionsModule } from './cashdrawer/cash-transactions/cash-transactions.module';
import { CashdrawerModule } from './cashdrawer/cashdrawer.module';
import { CompaniesModule } from './companies/companies.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { FeaturesModule } from './subscriptions/features/features.module';
import { HrModule } from './hr/hr.module';
import { InventoryModule } from './inventory/inventory.module';
import { KitchenDisplayDeviceModule } from './kitchen-display-system/kitchen-display-device/kitchen-display-device.module';
import { KitchenEventLogModule } from './kitchen-display-system/kitchen-event-log/kitchen-event-log.module';
import { KitchenOrderModule } from './kitchen-display-system/kitchen-order/kitchen-order.module';
import { KitchenOrderItemModule } from './kitchen-display-system/kitchen-order-item/kitchen-order-item.module';
import { KitchenStationModule } from './kitchen-display-system/kitchen-station/kitchen-station.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { MailModule } from './mail/mail.module';
import { MarketingAutomationActionsModule } from './marketing/marketing-automation-actions/marketing-automation-actions.module';
import { MarketingAutomationsModule } from './marketing/marketing-automations/marketing-automations.module';
import { MarketingCampaignModule } from './marketing/marketing_campaing/marketing_campaing.module';
import { MarketingCampaingAudienceModule } from './marketing/marketing-campaing-audience/marketing-campaing-audience.module';
import { MarketingCouponRedemptionsModule } from './marketing/marketing-coupon-redemptions/marketing-coupon-redemptions.module';
import { MarketingCouponsModule } from './marketing/marketing-coupons/marketing-coupons.module';
import { MarketingMessageLogsModule } from './marketing/marketing-message-logs/marketing-message-logs.module';
import { MarketingSegmentRulesModule } from './marketing/marketing-segment-rules/marketing-segment-rules.module';
import { MarketingSegmentsModule } from './marketing/marketing-segments/marketing-segments.module';
import { MerchantOvertimeRuleModule } from './configuration/merchant-overtime-rule/merchant-overtime-rule.module';
import { MerchantSubscriptionModule } from './subscriptions/merchant-subscriptions/merchant-subscription.module';
import { MerchantsModule } from './merchants/merchants.module';
import { OnlineDeliveryInfoModule } from './online-ordering-system/online-delivery-info/online-delivery-info.module';
import { OnlineMenuCategoryModule } from './online-ordering-system/online-menu-category/online-menu-category.module';
import { OnlineMenuItemModule } from './online-ordering-system/online-menu-item/online-menu-item.module';
import { OnlineMenuModule } from './online-ordering-system/online-menu/online-menu.module';
import { OnlineOrderModule } from './online-ordering-system/online-order/online-order.module';
import { OnlineOrderItemModule } from './online-ordering-system/online-order-item/online-order-item.module';
import { OnlinePaymentModule } from './online-ordering-system/online-payment/online-payment.module';
import { OnlineStoresModule } from './online-ordering-system/online-stores/online-stores.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrdersModule } from './orders/orders.module';
import { PayrollAdjustmentsModule } from './payroll/payroll-adjustments/payroll-adjustments.module';
import { PayrollEntriesModule } from './payroll/payroll-entries/payroll-entries.module';
import { PayrollRunsModule } from './payroll/payroll-runs/payroll-runs.module';
import { PayrollTaxDetailsModule } from './payroll/payroll-tax-details/payroll-tax-details.module';
import { PlanApplicationsModule } from './subscriptions/plan-applications/plan-applications.module';
import { PlanFeaturesModule } from './subscriptions/plan-features/plan-features.module';
import { ProductsInventoryModule } from './inventory/products-inventory/products-inventory.module';
import { PurchaseOrderItemModule } from './inventory/products-inventory/purchase-order-item/purchase-order-item.module';
import { PurchaseOrderModule } from './inventory/products-inventory/purchase-order/purchase-order.module';
import { QRCodeModule } from './qr-code/qr-code.module';
import { QRLocationModule } from './qr-code/qr-location/qr-location.module';
import { QRMenuItemModule } from './qr-code/qr-menu-item/qr-menu-item.module';
import { QRMenuModule } from './qr-code/qr-menu/qr-menu.module';
import { QRMenuSectionModule } from './qr-code/qr-menu-section/qr-menu-section.module';
import { QROrderItemModule } from './qr-code/qr-order-item/qr-order-item.module';
import { QrOrderModule } from './qr-code/qr-order/qr-order.module';
import { ShiftAssignmentsModule } from './shift-assignments/shift-assignments.module';
import { ShiftsModule } from './shifts/shifts.module';
import { SubscriptionApplicationModule } from './subscriptions/subscription-application/subscription-application.module';
import { SubscriptionPaymentsModule } from './subscriptions/subscription-payments/subscription-payments.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { TableAssignmentsModule } from './table-assignments/table-assignments.module';
import { TablesModule } from './tables/tables.module';
import { TipAllocationsModule } from './tips/tip-allocations/tip-allocations.module';
import { TipPoolMembersModule } from './tips/tip-pool-members/tip-pool-members.module';
import { TipPoolsModule } from './tips/tip-pools/tip-pools.module';
import { TipSettlementsModule } from './tips/tip-settlements/tip-settlements.module';
import { TipsModule } from './tips/tips/tips.module';
import { UsersModule } from './users/users.module';
import { CashTipMovementsModule } from './tips/cash-tip-movements/cash-tip-movements.module';

// Entities
import { ApplicationEntity } from './subscriptions/applications/entity/application-entity';
import { CashDrawer } from './cashdrawer/cash-drawers/entities/cash-drawer.entity';
import { CashDrawerHistory } from './cashdrawer/cash-drawer-history/entities/cash-drawer-history.entity';
import { CashTipMovement } from './tips/cash-tip-movements/entities/cash-tip-movement.entity';
import { CashTransaction } from './cashdrawer/cash-transactions/entities/cash-transaction.entity';
import { Category } from './inventory/products-inventory/category/entities/category.entity';
import { Collaborator } from './hr/collaborators/entities/collaborator.entity';
import { CollaboratorContract } from './hr/collaborator-contracts/entities/collaborator-contract.entity';
import { Company } from './companies/entities/company.entity';
import { Configuration } from './configuration/entity/configuration-entity';
import { Customer } from './business-partners/customers/entities/customer.entity';
import { FeatureEntity } from './subscriptions/features/entity/features.entity';
import { Item } from './inventory/products-inventory/stocks/items/entities/item.entity';
import { KitchenDisplayDevice } from './kitchen-display-system/kitchen-display-device/entities/kitchen-display-device.entity';
import { KitchenEventLog } from './kitchen-display-system/kitchen-event-log/entities/kitchen-event-log.entity';
import { KitchenOrder } from './kitchen-display-system/kitchen-order/entities/kitchen-order.entity';
import { KitchenOrderItem } from './kitchen-display-system/kitchen-order-item/entities/kitchen-order-item.entity';
import { KitchenStation } from './kitchen-display-system/kitchen-station/entities/kitchen-station.entity';
import { Location } from './inventory/products-inventory/stocks/locations/entities/location.entity';
import { LoyaltyCoupon } from './loyalty/loyalty-coupons/entities/loyalty-coupon.entity';
import { LoyaltyCustomer } from './loyalty/loyalty-customer/entities/loyalty-customer.entity';
import { LoyaltyPointTransaction } from './loyalty/loyalty-points-transaction/entities/loyalty-points-transaction.entity';
import { LoyaltyProgram } from './loyalty/loyalty-programs/entities/loyalty-program.entity';
import { LoyaltyReward } from './loyalty/loyalty-reward/entities/loyalty-reward.entity';
import { LoyaltyRewardsRedemtion } from './loyalty/loyalty-rewards-redemtions/entities/loyalty-rewards-redemtion.entity';
import { LoyaltyTier } from './loyalty/loyalty-tier/entities/loyalty-tier.entity';
import { MarketingAutomation } from './marketing/marketing-automations/entities/marketing-automation.entity';
import { MarketingAutomationAction } from './marketing/marketing-automation-actions/entities/marketing-automation-action.entity';
import { MarketingCampaign } from './marketing/marketing_campaing/entities/marketing_campaing.entity';
import { MarketingCampaignAudience } from './marketing/marketing-campaing-audience/entities/marketing-campaing-audience.entity';
import { MarketingCoupon } from './marketing/marketing-coupons/entities/marketing-coupon.entity';
import { MarketingCouponRedemption } from './marketing/marketing-coupon-redemptions/entities/marketing-coupon-redemption.entity';
import { MarketingMessageLog } from './marketing/marketing-message-logs/entities/marketing-message-log.entity';
import { MarketingSegment } from './marketing/marketing-segments/entities/marketing-segment.entity';
import { MarketingSegmentRule } from './marketing/marketing-segment-rules/entities/marketing-segment-rule.entity';
import { Merchant } from './merchants/entities/merchant.entity';
import { MerchantOvertimeRule } from './configuration/merchant-overtime-rule/entity/merchant-overtime-rule.entity';
import { MerchantSubscription } from './subscriptions/merchant-subscriptions/entities/merchant-subscription.entity';
import { MerchantTipRule } from './configuration/merchant-tip-rule/entity/merchant-tip-rule-entity';
import { Modifier } from './inventory/products-inventory/modifiers/entities/modifier.entity';
import { Movement } from './inventory/products-inventory/stocks/movements/entities/movement.entity';
import { OnlineDeliveryInfo } from './online-ordering-system/online-delivery-info/entities/online-delivery-info.entity';
import { OnlineMenu } from './online-ordering-system/online-menu/entities/online-menu.entity';
import { OnlineMenuCategory } from './online-ordering-system/online-menu-category/entities/online-menu-category.entity';
import { OnlineOrder } from './online-ordering-system/online-order/entities/online-order.entity';
import { OnlineOrderItem } from './online-ordering-system/online-order-item/entities/online-order-item.entity';
import { OnlinePayment } from './online-ordering-system/online-payment/entities/online-payment.entity';
import { OnlineStore } from './online-ordering-system/online-stores/entities/online-store.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './order-item/entities/order-item.entity';
import { PayrollAdjustment } from './payroll/payroll-adjustments/entities/payroll-adjustment.entity';
import { PayrollEntry } from './payroll/payroll-entries/entities/payroll-entry.entity';
import { PayrollRun } from './payroll/payroll-runs/entities/payroll-run.entity';
import { PayrollTaxDetail } from './payroll/payroll-tax-details/entities/payroll-tax-detail.entity';
import { PlanApplication } from './subscriptions/plan-applications/entity/plan-applications.entity';
import { PlanFeature } from './subscriptions/plan-features/entity/plan-features.entity';
import { Product } from './inventory/products-inventory/products/entities/product.entity';
import { PurchaseOrder } from './inventory/products-inventory/purchase-order/entities/purchase-order.entity';
import { PurchaseOrderItem } from './inventory/products-inventory/purchase-order-item/entities/purchase-order-item.entity';
import { QRLocation } from './qr-code/qr-location/entity/qr-location.entity';
import { QRMenu } from './qr-code/qr-menu/entity/qr-menu.entity';
import { QRMenuItem } from './qr-code/qr-menu-item/entity/qr-menu-item.entity';
import { QRMenuSection } from './qr-code/qr-menu-section/entity/qr-menu-section.entity';
import { QROrder } from './qr-code/qr-order/entity/qr-order.entity';
import { QROrderItem } from './qr-code/qr-order-item/entity/qr-order-item.entity';
import { Receipt } from './core/billing-transactions/receipts/entities/receipt.entity';
import { ReceiptItem } from './core/billing-transactions/receipt-item/entities/receipt-item.entity';
import { ReceiptTax } from './core/billing-transactions/receipt-tax/entities/receipt-tax.entity';
import { Shift } from './shifts/entities/shift.entity';
import { ShiftAssignment } from './shift-assignments/entities/shift-assignment.entity';
import { SubscriptionApplication } from './subscriptions/subscription-application/entity/subscription-application.entity';
import { SubscriptionPayment } from './subscriptions/subscription-payments/entity/subscription-payments.entity';
import { SubscriptionPlan } from './subscriptions/subscription-plan/entity/subscription-plan.entity';
import { SuplierInvoice } from './acount-payable/suplier-invoices/entities/suplier-invoice.entity';
import { Supplier } from './business-partners/suppliers/entities/supplier.entity';
import { Table } from './tables/entities/table.entity';
import { TableAssignment } from './table-assignments/entities/table-assignment.entity';
import { TimeEntry } from './hr/collaborator-time-entries/entities/time-entry.entity';
import { Tip } from './tips/tips/entities/tip.entity';
import { TipAllocation } from './tips/tip-allocations/entities/tip-allocation.entity';
import { TipPool } from './tips/tip-pools/entities/tip-pool.entity';
import { TipPoolMember } from './tips/tip-pool-members/entities/tip-pool-member.entity';
import { TipSettlement } from './tips/tip-settlements/entities/tip-settlement.entity';
import { User } from './users/entities/user.entity';
import { Variant } from './inventory/products-inventory/variants/entities/variant.entity';
import { OnlineMenuItem } from './online-ordering-system/online-menu-item/entities/online-menu-item.entity';
import { CoreModule } from './core/core.module';
import { BusinessPartnersModule } from './business-partners/business-partners.module';
import { LedgerAccount } from './core/financial-engine/ledger-accounts/entities/ledger-account.entity';
import { JournalEntry } from './core/financial-engine/journal-entry/entities/journal-entry.entity';
import { JournalEntryLine } from './core/financial-engine/journal-entry-line/entities/journal-entry-line.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT', '5432')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [
          ApplicationEntity,
          CashDrawer,
          CashDrawerHistory,
          CashTipMovement,
          CashTransaction,
          Category,
          Collaborator,
          CollaboratorContract,
          Company,
          Configuration,
          Customer,
          FeatureEntity,
          Item,
          KitchenDisplayDevice,
          KitchenEventLog,
          KitchenOrder,
          KitchenOrderItem,
          KitchenStation,
          LedgerAccount,
          JournalEntry,
          JournalEntryLine,
          Location,
          LoyaltyCoupon,
          LoyaltyCustomer,
          LoyaltyPointTransaction,
          LoyaltyProgram,
          LoyaltyReward,
          LoyaltyRewardsRedemtion,
          LoyaltyTier,
          MarketingAutomation,
          MarketingAutomationAction,
          MarketingCampaign,
          MarketingCampaignAudience,
          MarketingCoupon,
          MarketingCouponRedemption,
          MarketingMessageLog,
          MarketingSegment,
          MarketingSegmentRule,
          Merchant,
          MerchantOvertimeRule,
          MerchantSubscription,
          MerchantTipRule,
          Modifier,
          Movement,
          OnlineDeliveryInfo,
          OnlineMenu,
          OnlineMenuCategory,
          OnlineMenuItem,
          OnlineOrder,
          OnlineOrderItem,
          OnlinePayment,
          OnlineStore,
          Order,
          OrderItem,
          PayrollAdjustment,
          PayrollEntry,
          PayrollRun,
          PayrollTaxDetail,
          PlanApplication,
          PlanFeature,
          Product,
          PurchaseOrder,
          PurchaseOrderItem,
          QRLocation,
          QRMenu,
          QRMenuItem,
          QRMenuSection,
          QROrder,
          QROrderItem,
          Receipt,
          ReceiptItem,
          ReceiptTax,
          Shift,
          ShiftAssignment,
          SubscriptionApplication,
          SubscriptionPayment,
          SubscriptionPlan,
          SuplierInvoice,
          Supplier,
          Table,
          TableAssignment,
          TimeEntry,
          Tip,
          TipAllocation,
          TipPool,
          TipPoolMember,
          TipSettlement,
          User,
          Variant,
        ],
        synchronize: true,
      }),
    }),
    AcountPayableModule,
    ApplicationsModule,
    AuthModule,
    CashDrawerHistoryModule,
    CashDrawersModule,
    CashTransactionsModule,
    CashdrawerModule,
    CompaniesModule,
    ConfigurationModule,
    FeaturesModule,
    HrModule,
    InventoryModule,
    KitchenDisplayDeviceModule,
    KitchenEventLogModule,
    KitchenOrderModule,
    KitchenOrderItemModule,
    KitchenStationModule,
    LoyaltyModule,
    MailModule,
    MarketingAutomationActionsModule,
    MarketingAutomationsModule,
    MarketingCampaignModule,
    MarketingCampaingAudienceModule,
    MarketingCouponRedemptionsModule,
    MarketingCouponsModule,
    MarketingMessageLogsModule,
    MarketingSegmentRulesModule,
    MarketingSegmentsModule,
    MerchantOvertimeRuleModule,
    MerchantSubscriptionModule,
    MerchantsModule,
    OnlineDeliveryInfoModule,
    OnlineMenuCategoryModule,
    OnlineMenuItemModule,
    OnlineMenuModule,
    OnlineOrderModule,
    OnlineOrderItemModule,
    OnlinePaymentModule,
    OnlineStoresModule,
    OrderItemModule,
    OrdersModule,
    PayrollAdjustmentsModule,
    PayrollEntriesModule,
    PayrollRunsModule,
    PayrollTaxDetailsModule,
    PlanApplicationsModule,
    PlanFeaturesModule,
    ProductsInventoryModule,
    PurchaseOrderItemModule,
    PurchaseOrderModule,
    QRCodeModule,
    QRLocationModule,
    QRMenuItemModule,
    QRMenuModule,
    QRMenuSectionModule,
    QROrderItemModule,
    QrOrderModule,
    ShiftAssignmentsModule,
    ShiftsModule,
    SubscriptionApplicationModule,
    SubscriptionPaymentsModule,
    SubscriptionsModule,
    TableAssignmentsModule,
    TablesModule,
    TipAllocationsModule,
    TipPoolMembersModule,
    TipPoolsModule,
    TipSettlementsModule,
    TipsModule,
    UsersModule,
    CashTipMovementsModule,
    CoreModule,
    BusinessPartnersModule,
  ],
})
export class AppModule { }
