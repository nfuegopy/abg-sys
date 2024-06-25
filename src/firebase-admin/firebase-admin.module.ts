// src/firebase-admin.module.ts
import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: (configService: ConfigService) => {
        const serviceAccountPath = configService.get<string>('FIREBASE_SERVICE_ACCOUNT_KEY');
        if (!fs.existsSync(serviceAccountPath)) {
          throw new Error(`Service account key file not found at path: ${serviceAccountPath}`);
        }
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseAdminModule {}
