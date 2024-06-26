import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClientsService } from '../Service/clients.service';
import { CreateClientsDTO } from '../Dto/create-clients.dto';
//import { UpdateClientsDto } from '../dto/update-superadmin.dto';

@Controller('clients')
export class ClientsController{
    constructor(private readonly clientsService: ClientsService) {}
    @Post()
    create(@Body() createClientsDto: CreateClientsDTO) {
      return this.clientsService.create(createClientsDto);
    }
  
    @Get()
    findAll() {
      return this.clientsService.findAll();
    }

}