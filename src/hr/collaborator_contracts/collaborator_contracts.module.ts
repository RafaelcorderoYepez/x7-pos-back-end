import { Module } from '@nestjs/common';
import { CollaboratorContractsService } from './collaborator_contracts.service';
import { CollaboratorContractsController } from './collaborator_contracts.controller';

@Module({
  controllers: [CollaboratorContractsController],
  providers: [CollaboratorContractsService],
})
export class CollaboratorContractsModule {}
