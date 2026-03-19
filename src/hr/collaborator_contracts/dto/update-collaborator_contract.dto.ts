import { PartialType } from '@nestjs/swagger';
import { CreateCollaboratorContractDto } from './create-collaborator_contract.dto';

export class UpdateCollaboratorContractDto extends PartialType(CreateCollaboratorContractDto) {}
