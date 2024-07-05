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
import { DefendantsModule } from 'src/modules/referenciales/Defendants/Module/defendants.module';
import { CourtsModule } from 'src/modules/referenciales/Courts/module/courts.module';
import { AuthModule } from 'src/modules/auth/module/auth.module';
import { AssetTypesModule } from 'src/modules/referenciales/AssetTypes/Module/asset-types.module';
import { AssetsModule } from 'src/modules/referenciales/Assets/Module/assets.module';
import { SecretariesModule } from 'src/modules/referenciales/secretaries/Module/secretaries.module';
//import databaseConfig from '../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',

      isGlobal: true,
//      load: [firebaseConfig, databaseConfig],
      load: [firebaseConfig],
    }),
    FirebaseAdminModule,
    SuperAdminModule,
    UsersModule,
    RolesModule,
    UserRoleModule,
    ClientsModule,
    DefendantsModule,
    CourtsModule,
    AuthModule,
    AssetTypesModule,
    AssetsModule,
    SecretariesModule
  ],
})
export class AppModule {}