import { Controller, Post, Body, Param, Get, Patch, Delete, Req } from '@nestjs/common';
import { CasesService } from '../service/cases.service';
import { CreateCaseDTO } from '../dto/create-case.dto';
import { UpdateCaseDTO } from '../dto/update-case.dto';
import { Request } from 'express';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDTO, @Req() req: Request) {
    const userId = req.user?.id || 'tempUserId';
    return this.casesService.create(createCaseDto, userId);
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
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDTO, @Req() req: Request) {
    const userId = req.user?.id || 'tempUserId';
    return this.casesService.update(id, updateCaseDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user?.id || 'tempUserId';
    return this.casesService.remove(id, userId);
  }
}