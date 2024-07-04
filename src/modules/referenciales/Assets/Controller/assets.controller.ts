import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { AssetsService } from '../service/assets.service';
import { CreateAssetDTO } from '../dto/create-asset.dto';
import { UpdateAssetDTO } from '../dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDTO) {
    return this.assetsService.create(createAssetDto);
  }

  @Post('batch')
  createMultiple(@Body() createAssetDtos: CreateAssetDTO[]) {
    return this.assetsService.createMultiple(createAssetDtos);
  }

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDTO) {
    return this.assetsService.update(id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(id);
  }
}