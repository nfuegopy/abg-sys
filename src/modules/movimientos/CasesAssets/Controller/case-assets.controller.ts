import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CaseAssetsService } from '../service/case-assets.service';
import { CreateCaseAssetDTO } from '../dto/create-case-asset.dto';
import { UpdateCaseAssetDTO } from '../dto/update-case-asset.dto';

@Controller('case-assets')
export class CaseAssetsController {
  constructor(private readonly caseAssetsService: CaseAssetsService) {}

  @Post()
  create(@Body() createCaseAssetDto: CreateCaseAssetDTO) {
    return this.caseAssetsService.create(createCaseAssetDto);
  }

  @Get()
  findAll() {
    return this.caseAssetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caseAssetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseAssetDto: UpdateCaseAssetDTO) {
    return this.caseAssetsService.update(id, updateCaseAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseAssetsService.remove(id);
  }
}