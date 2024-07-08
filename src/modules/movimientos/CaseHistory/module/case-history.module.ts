// src/modules/Movimientos/CaseHistory/Module/case-history.module.ts
import { Module } from '@nestjs/common';
import { CaseHistoryService } from '../Service/case-history.service';
import { CaseHistoryController } from '../Controller/case-history.controller';

@Module({
  providers: [CaseHistoryService],
  controllers: [CaseHistoryController],
  exports: [CaseHistoryService],
})
export class CaseHistoryModule {}