import { Injectable } from '@nestjs/common';
import { CreateCollaboratorContractDto } from './dto/create-collaborator_contract.dto';
import { UpdateCollaboratorContractDto } from './dto/update-collaborator_contract.dto';

@Injectable()
export class CollaboratorContractsService {
  create(createCollaboratorContractDto: CreateCollaboratorContractDto) {
    return 'This action adds a new collaboratorContract';
  }

  findAll() {
    return `This action returns all collaboratorContracts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collaboratorContract`;
  }

  update(id: number, updateCollaboratorContractDto: UpdateCollaboratorContractDto) {
    return `This action updates a #${id} collaboratorContract`;
  }

  remove(id: number) {
    return `This action removes a #${id} collaboratorContract`;
  }
}
