import { Module } from '@nestjs/common';
import { AssetsService } from '../Service/assets.service';
import { AssetsController } from '../Controller/assets.controller';

@Module({
  providers: [AssetsService],
  controllers: [AssetsController],
  exports: [AssetsService],
})
export class AssetsModule {}