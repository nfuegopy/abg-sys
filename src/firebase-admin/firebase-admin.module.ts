// import { Module, Global } from '@nestjs/common';
// import * as admin from 'firebase-admin';
// import { ConfigService } from '@nestjs/config';
// import * as fs from 'fs';
// import * as path from 'path';

// @Global()
// @Module({
//   providers: [
//     {
//       provide: 'FIREBASE_ADMIN',
//       useFactory: (configService: ConfigService) => {
//         let serviceAccountPath = configService.get<string>('FIREBASE_SERVICE_ACCOUNT_KEY');
//         console.log('Service account path from env:', serviceAccountPath);

//         if (!serviceAccountPath) {
//           serviceAccountPath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');
//           console.log('Fallback service account path:', serviceAccountPath);
//         }

//         if (!fs.existsSync(serviceAccountPath)) {
//           throw new Error(`Service account key file not found at path: ${serviceAccountPath}`);
//         }

//         try {
//           const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
//           return admin.initializeApp({
//             credential: admin.credential.cert(serviceAccount),
//           });
//         } catch (error) {
//           console.error('Error initializing Firebase Admin:', error);
//           throw error;
//         }
//       },
//       inject: [ConfigService],
//     },
//   ],
//   exports: ['FIREBASE_ADMIN'],
// })
// export class FirebaseAdminModule {}

import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: (configService: ConfigService) => {
        const firebaseCredentials = configService.get('firebase.credential');
        if (!firebaseCredentials) {
          throw new Error('Firebase credentials are not defined in the configuration.');
        }

        try {
          return admin.initializeApp({
            credential: admin.credential.cert(firebaseCredentials),
          });
        } catch (error) {
          console.error('Error initializing Firebase Admin:', error);
          throw error;
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseAdminModule {}