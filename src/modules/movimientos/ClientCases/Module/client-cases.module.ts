import { Module } from '@nestjs/common';
import { ClientCasesService } from '../service/client-cases.service';
import { ClientCasesController } from '../controller/client-cases.controller';

@Module({
  providers: [ClientCasesService],
  controllers: [ClientCasesController],
  exports: [ClientCasesService],
})
export class ClientCasesModule {}