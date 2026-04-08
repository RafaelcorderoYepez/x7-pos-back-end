import { Module } from '@nestjs/common';
import { DiningSystemController } from './dining-system.controller';
import { DiningSystemService } from './dining-system.service';

@Module({
  controllers: [DiningSystemController],
  providers: [DiningSystemService]
})
export class DiningSystemModule {}
