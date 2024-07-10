// src/modules/Movimientos/CaseHistory/Module/case-history.module.ts
import { Module } from '@nestjs/common';
import { CaseHistoryService } from '../service/case-history.service';
import { CaseHistoryController } from '../controller/case-history.controller';

@Module({
  providers: [CaseHistoryService],
  controllers: [CaseHistoryController],
  exports: [CaseHistoryService],
})
export class CaseHistoryModule {}