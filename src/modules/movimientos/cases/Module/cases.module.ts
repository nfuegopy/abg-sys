import { Module } from '@nestjs/common';
import { CasesService } from '../Service/cases.service';
import { CasesController } from '../Controller/cases.controller';
import { CaseHistoryModule } from '../../CaseHistory/module/case-history.module';

@Module({
  imports: [CaseHistoryModule],
  providers: [CasesService],
  controllers: [CasesController],
  exports: [CasesService],
})
export class CasesModule {}