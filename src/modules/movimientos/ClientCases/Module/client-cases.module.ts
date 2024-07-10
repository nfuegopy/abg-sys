import { Module } from '@nestjs/common';
import { ClientCasesService } from '../Service/client-cases.service';
import { ClientCasesController } from '../Controller/client-cases.controller';

@Module({
  providers: [ClientCasesService],
  controllers: [ClientCasesController],
  exports: [ClientCasesService],
})
export class ClientCasesModule {}