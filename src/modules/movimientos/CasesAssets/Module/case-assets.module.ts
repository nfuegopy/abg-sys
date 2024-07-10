import { Module } from '@nestjs/common';
import { CaseAssetsService } from '../Service/case-assets.service';
import { CaseAssetsController } from '../Controller/case-assets.controller';

@Module({
  providers: [CaseAssetsService],
  controllers: [CaseAssetsController],
  exports: [CaseAssetsService],
})
export class CaseAssetsModule {}