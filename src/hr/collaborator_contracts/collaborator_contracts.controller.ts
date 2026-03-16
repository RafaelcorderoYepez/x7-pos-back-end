import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollaboratorContractsService } from './collaborator_contracts.service';
import { CreateCollaboratorContractDto } from './dto/create-collaborator_contract.dto';
import { UpdateCollaboratorContractDto } from './dto/update-collaborator_contract.dto';

@Controller('collaborator-contracts')
export class CollaboratorContractsController {
  constructor(private readonly collaboratorContractsService: CollaboratorContractsService) {}

  @Post()
  create(@Body() createCollaboratorContractDto: CreateCollaboratorContractDto) {
    return this.collaboratorContractsService.create(createCollaboratorContractDto);
  }

  @Get()
  findAll() {
    return this.collaboratorContractsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaboratorContractsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollaboratorContractDto: UpdateCollaboratorContractDto) {
    return this.collaboratorContractsService.update(+id, updateCollaboratorContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collaboratorContractsService.remove(+id);
  }
}
