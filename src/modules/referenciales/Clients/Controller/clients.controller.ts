import { Controller, Post, Body,Param ,Get, Patch, Delete } from '@nestjs/common';
import { ClientsService } from '../Service/clients.service';
import { CreateClientsDTO } from '../Dto/create-clients.dto';
import { UpdateClientsDTO } from '../Dto/update-clients.dto';

@Controller('clients')
export class ClientsController{
    constructor(private readonly clientsService: ClientsService) {}
    @Post()
    create(@Body() createClientsDto: CreateClientsDTO) {
      return this.clientsService.create(createClientsDto);
    }
  
//Sintaxis para utilizar  la inserccion de varios registros a la vez
@Post('batch')
createMultiple(@Body() createClientsDtos: CreateClientsDTO[]) {
  return this.clientsService.createMultiple(createClientsDtos);
}
//Solo es un codigo de prueba 
    @Get()
    findAll() {
      return this.clientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
       return this.clientsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientsDto: UpdateClientsDTO) {
      return this.clientsService.update(id, updateClientsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.clientsService.remove(id);
    }


}