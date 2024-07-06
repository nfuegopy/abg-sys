import { Module } from '@nestjs/common';
import { CasesService } from '../service/cases.service';
import { CasesController } from '../controller/cases.controller';

@Module({
  providers: [CasesService],
  controllers: [CasesController],
  exports: [CasesService],
})
export class CasesModule {}