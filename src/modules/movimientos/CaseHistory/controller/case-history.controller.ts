// src/modules/Movimientos/CaseHistory/Controller/case-history.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CaseHistoryService } from '../Service/case-history.service';
import { CreateCaseHistoryDTO } from '../Dto/create-case-history.dto';

@Controller('case-history')
export class CaseHistoryController {
  constructor(private readonly caseHistoryService: CaseHistoryService) {}

  @Post()
  create(@Body() createCaseHistoryDto: CreateCaseHistoryDTO) {
    return this.caseHistoryService.create(createCaseHistoryDto);
  }

  @Get()
  findAll() {
    return this.caseHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caseHistoryService.findOne(id);
  }

  @Get('case/:caseId')
  findByCaseId(@Param('caseId') caseId: string) {
    return this.caseHistoryService.findByCaseId(caseId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseHistoryService.remove(id);
  }
}