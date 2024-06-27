import { Injectable, Inject, UnauthorizedException, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SuperAdmin } from '../../Admin/superadmin/interfaces/superadmin.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private firestore: FirebaseFirestore.Firestore;

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
    private readonly jwtService: JwtService,
  ) {
    this.firestore = firebaseAdmin.firestore();
  }

  async validateUser(email: string, pass: string): Promise<SuperAdmin> {
    this.logger.log(`Validating user with email: ${email}`);
    const snapshot = await this.firestore.collection('superadmins').where('email', '==', email).get();
    if (snapshot.empty) {
      this.logger.warn(`User with email ${email} not found`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data() as SuperAdmin;
    const passwordValid = await bcrypt.compare(pass, user.password);

    if (!passwordValid) {
      this.logger.warn(`Invalid password for user with email ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User with email ${email} validated successfully`);
    return { ...user, id: userDoc.id };
  }

  async login(user: SuperAdmin) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    this.logger.log(`Generated JWT for user with email: ${user.email}`);
    return {
      access_token: token,
    };
  }
}
