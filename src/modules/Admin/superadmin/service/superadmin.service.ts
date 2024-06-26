import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateSuperAdminDto } from '../dto/create-superadmin.dto';
import { UpdateSuperAdminDto } from '../dto/update-superadmin.dto';
import * as bcrypt from 'bcrypt';
import { SuperAdmin } from '../interfaces/superadmin.interface';

@Injectable()
export class SuperAdminService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  async create(createSuperAdminDto: CreateSuperAdminDto): Promise<SuperAdmin> {
    const { name, email, password } = createSuperAdminDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const superAdminData: SuperAdmin = { name, email, password: hashedPassword, is_active: true, created_at: new Date(), updated_at: new Date() };
    const superAdminRef = this.firestore.collection('superadmins').doc();
    await superAdminRef.set(superAdminData);

    return { id: superAdminRef.id, ...superAdminData };
  }

  async findAll(): Promise<SuperAdmin[]> {
    const snapshot = await this.firestore.collection('superadmins').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SuperAdmin));
  }

  async findOne(id: string): Promise<SuperAdmin> {
    const doc = await this.firestore.collection('superadmins').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`SuperAdmin with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as SuperAdmin;
  }

  async update(id: string, updateSuperAdminDto: UpdateSuperAdminDto): Promise<SuperAdmin> {
    const docRef = this.firestore.collection('superadmins').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Super admin con el ID ${id} not found`);
    }

    const updatedData = { ...updateSuperAdminDto, updated_at: new Date() };
    await docRef.update(updatedData);

    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as SuperAdmin;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('superadmins').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`SuperAdmin with ID ${id} not found`);
    }
    await docRef.delete();
  }
}
