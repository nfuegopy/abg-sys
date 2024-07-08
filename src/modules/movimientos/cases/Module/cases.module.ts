import { Module } from '@nestjs/common';
import { CasesService } from '../service/cases.service';
import { CasesController } from '../controller/cases.controller';
import { CaseHistoryModule } from '../../CaseHistory/Module/case-history.module';

@Module({
  imports: [CaseHistoryModule],
  providers: [CasesService],
  controllers: [CasesController],
  exports: [CasesService],
})
export class CasesModule {}