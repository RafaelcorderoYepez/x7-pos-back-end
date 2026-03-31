import { Controller } from '@nestjs/common';
import { BusinessPartnersService } from './business-partners.service';

@Controller('business-partners')
export class BusinessPartnersController {
  constructor(private readonly businessPartnersService: BusinessPartnersService) {}
}
