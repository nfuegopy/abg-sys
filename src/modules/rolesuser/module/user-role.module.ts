// src/modules/user_roles/module/user-role.module.ts
import { Module } from '@nestjs/common';
import { UserRoleService } from '../service/user-role.service';
import { UserRoleController } from '../controller/user-role.controller';
import { FirebaseAdminModule } from '../../../firebase-admin/firebase-admin.module';

@Module({
  imports: [FirebaseAdminModule],
  providers: [UserRoleService],
  controllers: [UserRoleController],
})
export class UserRoleModule {}
