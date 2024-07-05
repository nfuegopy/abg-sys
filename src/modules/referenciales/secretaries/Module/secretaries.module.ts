import { Module } from '@nestjs/common';
import { SecretariesService } from '../service/secretaries.service';
import { SecretariesController } from '../controller/secretaries.controller';

@Module({
  providers: [SecretariesService],
  controllers: [SecretariesController],
  exports: [SecretariesService],
})
export class SecretariesModule {}