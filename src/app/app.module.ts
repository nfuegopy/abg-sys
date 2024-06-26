// src/app.module.ts
// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { FirebaseAdminModule } from '../firebase-admin.module';
// import { SuperAdminModule } from '../modules/superadmin/module/superadmin.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     FirebaseAdminModule,
//     SuperAdminModule,
//   ],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
import firebaseConfig from '../config/firebase.config';
import { SuperAdminModule } from '../modules/Admin/superadmin/module/superadmin.module';
import { UsersModule } from 'src/modules/Admin/users/module/users.module';
import { RolesModule } from 'src/modules/Admin/roles/modules/roles.modules';
import { UserRoleModule } from 'src/modules/Admin/rolesuser/module/user-role.module';
import { ClientsModule } from 'src/modules/referenciales/Clients/Module/clients.module';
//import databaseConfig from '../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
//      load: [firebaseConfig, databaseConfig],
      load: [firebaseConfig],
    }),
    FirebaseAdminModule,
    SuperAdminModule,
    UsersModule,
    RolesModule,
    UserRoleModule,
    ClientsModule
    // Otros módulos...
  ],
})
export class AppModule {}