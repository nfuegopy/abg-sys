import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateSecretaryDTO } from '../dto/create-secretary.dto';
import { UpdateSecretaryDTO } from '../dto/update-secretary.dto';
import { SecretaryInterface } from '../interfaces/secretary.interface';

@Injectable()
export class SecretariesService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  async create(createSecretaryDto: CreateSecretaryDTO): Promise<SecretaryInterface> {
    const { name, court_id, phone, email } = createSecretaryDto;
    const secretaryData: SecretaryInterface = {
      name,
      court_id,
      phone,
      email,
      created_at: new Date(),
      updated_at: new Date()
    };
    const secretaryRef = this.firestore.collection('secretaries').doc();
    await secretaryRef.set(secretaryData);
    return { id: secretaryRef.id, ...secretaryData };
  }

  async createMultiple(createSecretaryDtos: CreateSecretaryDTO[]): Promise<SecretaryInterface[]> {
    const batch = this.firestore.batch();
    const secretariesDataArray: SecretaryInterface[] = [];

    for (const createSecretaryDto of createSecretaryDtos) {
      const { name, court_id, phone, email } = createSecretaryDto;
      const secretaryData: SecretaryInterface = {
        name,
        court_id,
        phone,
        email,
        created_at: new Date(),
        updated_at: new Date()
      };
      const secretaryRef = this.firestore.collection('secretaries').doc();
      batch.set(secretaryRef, secretaryData);
      secretariesDataArray.push({ id: secretaryRef.id, ...secretaryData });
    }

    await batch.commit();
    return secretariesDataArray;
  }

  async findAll(): Promise<SecretaryInterface[]> {
    const snapshot = await this.firestore.collection('secretaries').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SecretaryInterface));
  }

  async findOne(id: string): Promise<SecretaryInterface> {
    const doc = await this.firestore.collection('secretaries').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Secretary with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as SecretaryInterface;
  }

  async update(id: string, updateSecretaryDto: UpdateSecretaryDTO): Promise<SecretaryInterface> {
    const docRef = this.firestore.collection('secretaries').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Secretary with ID ${id} not found`);
    }
    const updateData = { ...updateSecretaryDto, updated_at: new Date() };
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as SecretaryInterface;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('secretaries').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Secretary with ID ${id} not found`);
    }
    await docRef.delete();
  }
}