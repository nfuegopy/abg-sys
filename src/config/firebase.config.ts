// src/config/firebase.config.ts
//comentado para usar dentro de render 
//  import { registerAs } from '@nestjs/config';
//  import * as path from 'path';

//  export default registerAs('firebase', () => ({
//    serviceAccountPath: process.env.FIREBASE_CREDENTIALS || path.join(__dirname, '..', '..', 'serviceAccountKey.json'),

//  }));
// sconfiguracion para render 
import { registerAs } from '@nestjs/config';

export default registerAs('firebase', () => ({
  credential: JSON.parse(process.env.FIREBASE_CREDENTIALS || '{}'),
}));