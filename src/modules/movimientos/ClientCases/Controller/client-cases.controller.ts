import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ClientCasesService } from '../service/client-cases.service';
import { CreateClientCaseDTO } from '../dto/create-client-case.dto';
import { UpdateClientCaseDTO } from '../dto/update-client-case.dto';

@Controller('client-cases')
export class ClientCasesController {
  constructor(private readonly clientCasesService: ClientCasesService) {}

  @Post()
  create(@Body() createClientCaseDto: CreateClientCaseDTO) {
    return this.clientCasesService.create(createClientCaseDto);
  }

  @Get()
  findAll() {
    return this.clientCasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientCasesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientCaseDto: UpdateClientCaseDTO) {
    return this.clientCasesService.update(id, updateClientCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientCasesService.remove(id);
  }
}