import { Module } from '@nestjs/common';
import { SecretariesService } from '../Service/secretaries.service';
import { SecretariesController } from '../Controller/secretaries.controller';

@Module({
  providers: [SecretariesService],
  controllers: [SecretariesController],
  exports: [SecretariesService],
})
export class SecretariesModule {}