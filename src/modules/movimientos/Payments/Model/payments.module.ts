import { Module } from '@nestjs/common';
import { PaymentsService } from '../Service/payments.service';
import { PaymentsController } from '../Controller/payments.controller';

@Module({
  providers: [PaymentsService],
  controllers: [PaymentsController],
  exports: [PaymentsService],
})
export class PaymentsModule {}