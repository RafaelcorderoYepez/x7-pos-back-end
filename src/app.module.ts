// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { MerchantsModule } from './merchants/merchants.module';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { ProductsInventoryModule } from './products-inventory/products-inventory.module';
import { TablesModule } from './tables/tables.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PlanApplicationsModule } from './subscriptions/plan-applications/plan-applications.module';
import { ApplicationsModule } from './subscriptions/applications/applications.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';

// Entities;
import { User } from './users/entities/user.entity';
import { Company } from './companies/entities/company.entity';
import { Merchant } from './merchants/entities/merchant.entity';
import { Customer } from './customers/entities/customer.entity';
import { Category } from './products-inventory/category/entities/category.entity';
import { Table } from './tables/entities/table.entity';
import { Collaborator } from './collaborators/entities/collaborator.entity';

import { Shift } from './shifts/entities/shift.entity';
import { ShiftsModule } from './shifts/shifts.module';
import { Product } from './products-inventory/products/entities/product.entity';
import { Supplier } from './products-inventory/suppliers/entities/supplier.entity';
import { ShiftAssignmentsModule } from './shift-assignments/shift-assignments.module';
import { ShiftAssignment } from './shift-assignments/entities/shift-assignment.entity';
import { TableAssignmentsModule } from './table-assignments/table-assignments.module';
import { TableAssignment } from './table-assignments/entities/table-assignment.entity';
import { SuscriptionPlan } from './suscriptions/suscription-plan/entity/suscription-plan.entity';
import { MerchantSuscription } from './suscriptions/merchant-suscriptions/entities/merchant-suscription.entity';
import { AplicationEntity } from './suscriptions/aplications/entity/aplication-entity';
import { PlanAplication } from './suscriptions/plan-aplications/entity/plan-aplications.entity';
import { SubscriptionPlan } from './subscriptions/subscription-plan/entity/subscription-plan.entity';
import { MerchantSubscription } from './subscriptions/merchant-subscriptions/entities/merchant-subscription.entity';
import { ApplicationEntity } from './subscriptions/applications/entity/application-entity';
import { PlanApplication } from './subscriptions/plan-applications/entity/plan-applications.entity';

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
          User,
          Company,
          Merchant,
          Customer,
          Table,
          SubscriptionPlan,
          Category,
          Collaborator,
          Shift,
          ShiftAssignment,
          TableAssignment,
          MerchSub,
          Product,
          Supplier,
          MerchantSubscription,
          ApplicationEntity,
          PlanApplication,
          Collaborator,
          Shift,
        ],
        synchronize: true,
      }),
    }),
    // Modules
    AuthModule,
    CompaniesModule,
    MerchantsModule,
    UsersModule,
    CustomersModule,
    TablesModule,
    MailModule,
    ProductsInventoryModule,

    SubscriptionsModule,

    ApplicationsModule,
    CollaboratorsModule,
    ShiftsModule,

    MerchSubModule,

    ShiftAssignmentsModule,

    TableAssignmentsModule,
    PlanAplicationsModule,
    PlanApplicationsModule,
  ],
})
export class AppModule {}
