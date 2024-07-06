import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateCaseDTO } from '../dto/create-case.dto';
import { UpdateCaseDTO } from '../dto/update-case.dto';
import { CaseInterface } from '../interface/case.interface';

@Injectable()
export class CasesService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  async create(createCaseDto: CreateCaseDTO): Promise<CaseInterface> {
    const caseData: CaseInterface = {
      ...createCaseDto,
      created_at: new Date(),
      updated_at: new Date()
    };
    const caseRef = this.firestore.collection('cases').doc();
    await caseRef.set(caseData);
    return { id: caseRef.id, ...caseData };
  }

  async findAll(): Promise<CaseInterface[]> {
    const snapshot = await this.firestore.collection('cases').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CaseInterface));
  }

  async findOne(id: string): Promise<CaseInterface> {
    const doc = await this.firestore.collection('cases').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as CaseInterface;
  }

  async update(id: string, updateCaseDto: UpdateCaseDTO): Promise<CaseInterface> {
    const docRef = this.firestore.collection('cases').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    const updateData = { ...updateCaseDto, updated_at: new Date() };
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as CaseInterface;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('cases').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    await docRef.delete();
  }
}