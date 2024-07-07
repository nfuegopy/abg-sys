import { Module } from '@nestjs/common';
import { DefendantCasesService } from '../service/defendant-cases.service';
import { DefendantCasesController } from '../controller/defendant-cases.controller';

@Module({
  providers: [DefendantCasesService],
  controllers: [DefendantCasesController],
  exports: [DefendantCasesService],
})
export class DefendantCasesModule {}