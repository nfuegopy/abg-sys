import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { CasesService } from '../service/cases.service';
import { CreateCaseDTO } from '../dto/create-case.dto';
import { UpdateCaseDTO } from '../dto/update-case.dto';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDTO) {
    return this.casesService.create(createCaseDto);
  }

  @Get()
  findAll() {
    return this.casesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDTO) {
    return this.casesService.update(id, updateCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casesService.remove(id);
  }
}