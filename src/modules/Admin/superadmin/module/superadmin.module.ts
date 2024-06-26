// src/superadmin/superadmin.module.ts
import { Module } from '@nestjs/common';
import { SuperAdminService } from '../service/superadmin.service';
import { SuperAdminController } from '../controller/superadmin.controller';

@Module({
  providers: [SuperAdminService],
  controllers: [SuperAdminController],
})
export class SuperAdminModule {}
