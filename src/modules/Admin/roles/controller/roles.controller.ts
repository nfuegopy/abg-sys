import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { RolesService } from '../service/roles.service';
import { CreateRolesDto } from '../dto/create-roles.dto';
import { UpdateRolesDto } from '../dto/update-roles.dto';

@Controller('roles')
export  class RolesController{
constructor(private readonly rolesService: RolesService){}


@Post()
create(@Body() createRolesDto: CreateRolesDto) {
  return this.rolesService.create(createRolesDto);
}

@Get()
findAll() {
  return this.rolesService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.rolesService.findOne(id);
}

@Patch(':id')
update(@Param('id') id: string, @Body() updateRolesDto: UpdateRolesDto) {
  return this.rolesService.update(id, updateRolesDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.rolesService.remove(id);
}

}