import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { SecretariesService } from '../service/secretaries.service';
import { CreateSecretaryDTO } from '../dto/create-secretary.dto';
import { UpdateSecretaryDTO } from '../dto/update-secretary.dto';

@Controller('secretaries')
export class SecretariesController {
  constructor(private readonly secretariesService: SecretariesService) {}

  @Post()
  create(@Body() createSecretaryDto: CreateSecretaryDTO) {
    return this.secretariesService.create(createSecretaryDto);
  }

  @Post('batch')
  createMultiple(@Body() createSecretaryDtos: CreateSecretaryDTO[]) {
    return this.secretariesService.createMultiple(createSecretaryDtos);
  }

  @Get()
  findAll() {
    return this.secretariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secretariesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSecretaryDto: UpdateSecretaryDTO) {
    return this.secretariesService.update(id, updateSecretaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secretariesService.remove(id);
  }
}