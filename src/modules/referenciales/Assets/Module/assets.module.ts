import { Module } from '@nestjs/common';
import { AssetsService } from '../service/assets.service';
import { AssetsController } from '../controller/assets.controller';

@Module({
  providers: [AssetsService],
  controllers: [AssetsController],
  exports: [AssetsService],
})
export class AssetsModule {}