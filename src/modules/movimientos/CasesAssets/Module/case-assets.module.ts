import { Module } from '@nestjs/common';
import { CaseAssetsService } from '../service/case-assets.service';
import { CaseAssetsController } from '../controller/case-assets.controller';

@Module({
  providers: [CaseAssetsService],
  controllers: [CaseAssetsController],
  exports: [CaseAssetsService],
})
export class CaseAssetsModule {}