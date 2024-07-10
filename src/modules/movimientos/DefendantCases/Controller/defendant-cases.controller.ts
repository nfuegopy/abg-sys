import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { DefendantCasesService } from '../Service/defendant-cases.service';
import { CreateDefendantCaseDTO } from '../Dto/create-defendant-case.dto';
import { UpdateDefendantCaseDTO } from '../Dto/update-defendant-case.dto';

@Controller('defendant-cases')
export class DefendantCasesController {
  constructor(private readonly defendantCasesService: DefendantCasesService) {}

  @Post()
  create(@Body() createDefendantCaseDto: CreateDefendantCaseDTO) {
    return this.defendantCasesService.create(createDefendantCaseDto);
  }

  @Get()
  findAll() {
    return this.defendantCasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defendantCasesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefendantCaseDto: UpdateDefendantCaseDTO) {
    return this.defendantCasesService.update(id, updateDefendantCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defendantCasesService.remove(id);
  }
}