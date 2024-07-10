import { Module } from '@nestjs/common';
import { DefendantCasesService } from '../Service/defendant-cases.service';
import { DefendantCasesController } from '../Controller/defendant-cases.controller';

@Module({
  providers: [DefendantCasesService],
  controllers: [DefendantCasesController],
  exports: [DefendantCasesService],
})
export class DefendantCasesModule {}