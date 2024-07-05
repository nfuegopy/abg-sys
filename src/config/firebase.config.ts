// src/config/firebase.config.ts
import { registerAs } from '@nestjs/config';
import * as path from 'path';

export default registerAs('firebase', () => ({
  serviceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_KEY || path.join(__dirname, '..', '..', 'serviceAccountKey.json'),

}));
