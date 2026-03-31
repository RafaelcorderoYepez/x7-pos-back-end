import { Controller } from '@nestjs/common';
import { PlatformSaasService } from './platform-saas.service';

@Controller('platform-saas')
export class PlatformSaasController {
  constructor(private readonly platformSaasService: PlatformSaasService) {}
}
