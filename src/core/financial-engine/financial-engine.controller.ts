import { Controller } from '@nestjs/common';
import { FinancialEngineService } from './financial-engine.service';

@Controller('financial-engine')
export class FinancialEngineController {
  constructor(private readonly financialEngineService: FinancialEngineService) {}
}
