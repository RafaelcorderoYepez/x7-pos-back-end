import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { FinancialEngineModule } from './financial-engine/financial-engine.module';

@Module({
  controllers: [CoreController],
  providers: [CoreService],
  imports: [FinancialEngineModule],
})
export class CoreModule {}
