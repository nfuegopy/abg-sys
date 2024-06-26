import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { SuperAdminService } from '../service/superadmin.service';
import { CreateSuperAdminDto } from '../dto/create-superadmin.dto';
import { UpdateSuperAdminDto } from '../dto/update-superadmin.dto';

@Controller('superadmin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post()
  create(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.superAdminService.create(createSuperAdminDto);
  }

  @Get()
  findAll() {
    return this.superAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superAdminService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuperAdminDto: UpdateSuperAdminDto) {
    return this.superAdminService.update(id, updateSuperAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superAdminService.remove(id);
  }
}
