import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { AssetTypesService } from '../service/asset-types.service';
import { CreateAssetTypeDTO } from '../dto/create-asset-type.dto';
import { UpdateAssetTypeDTO } from '../dto/update-asset-type.dto';

@Controller('asset-types')
export class AssetTypesController {
  constructor(private readonly assetTypesService: AssetTypesService) {}

  @Post()
  create(@Body() createAssetTypeDto: CreateAssetTypeDTO) {
    return this.assetTypesService.create(createAssetTypeDto);
  }

  @Post('batch')
  createMultiple(@Body() createAssetTypeDtos: CreateAssetTypeDTO[]) {
    return this.assetTypesService.createMultiple(createAssetTypeDtos);
  }

  @Get()
  findAll() {
    return this.assetTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetTypeDto: UpdateAssetTypeDTO) {
    return this.assetTypesService.update(id, updateAssetTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetTypesService.remove(id);
  }
}