// src/modules/Movimientos/CaseHistory/Controller/case-history.controller.ts
import { Controller, Get, Post, Body, Param, Delete, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CaseHistoryService } from '../service/case-history.service';
import { CreateCaseHistoryDTO } from '../dto/create-case-history.dto';

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
  async findByCaseId(@Param('caseId') caseId: string) {
    try {
      const history = await this.caseHistoryService.findByCaseId(caseId);
      if (history.length === 0) {
        throw new NotFoundException(`No history found for case ID ${caseId}`);
      }
      return history;
    } catch (error) {
      console.error(`Error in findByCaseId controller: ${error.message}`);
      if (error.message.includes('El índice necesario para esta consulta aún no está listo')) {
        throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
      }
      throw new NotFoundException(`Error fetching history for case ID ${caseId}: ${error.message}`);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseHistoryService.remove(id);
  }
}