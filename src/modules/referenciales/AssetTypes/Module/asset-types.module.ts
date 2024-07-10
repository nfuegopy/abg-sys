import { Module } from '@nestjs/common';
import { AssetTypesService } from '../Service/asset-types.service';
import { AssetTypesController } from '../Controller/asset-types.controller';

@Module({
  providers: [AssetTypesService],
  controllers: [AssetTypesController],
  exports: [AssetTypesService],
})
export class AssetTypesModule {}