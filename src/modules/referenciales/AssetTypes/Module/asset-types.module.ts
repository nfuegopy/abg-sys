import { Module } from '@nestjs/common';
import { AssetTypesService } from '../service/asset-types.service';
import { AssetTypesController } from '../controller/asset-types.controller';

@Module({
  providers: [AssetTypesService],
  controllers: [AssetTypesController],
  exports: [AssetTypesService],
})
export class AssetTypesModule {}