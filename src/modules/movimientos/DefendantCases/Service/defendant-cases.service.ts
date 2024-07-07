import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateDefendantCaseDTO } from '../dto/create-defendant-case.dto';
import { UpdateDefendantCaseDTO } from '../dto/update-defendant-case.dto';
import { DefendantCaseInterface } from '../interface/defendant-case.interface';

@Injectable()
export class DefendantCasesService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  async create(createDefendantCaseDto: CreateDefendantCaseDTO): Promise<DefendantCaseInterface> {
    const defendantCaseData: DefendantCaseInterface = {
      ...createDefendantCaseDto,
      created_at: new Date(),
      updated_at: new Date()
    };
    const defendantCaseRef = this.firestore.collection('defendant_cases').doc();
    await defendantCaseRef.set(defendantCaseData);
    return { id: defendantCaseRef.id, ...defendantCaseData };
  }

  async findAll(): Promise<DefendantCaseInterface[]> {
    const snapshot = await this.firestore.collection('defendant_cases').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DefendantCaseInterface));
  }

  async findOne(id: string): Promise<DefendantCaseInterface> {
    const doc = await this.firestore.collection('defendant_cases').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Defendant Case with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as DefendantCaseInterface;
  }

  async update(id: string, updateDefendantCaseDto: UpdateDefendantCaseDTO): Promise<DefendantCaseInterface> {
    const docRef = this.firestore.collection('defendant_cases').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Defendant Case with ID ${id} not found`);
    }
    const updateData = { ...updateDefendantCaseDto, updated_at: new Date() };
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as DefendantCaseInterface;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('defendant_cases').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Defendant Case with ID ${id} not found`);
    }
    await docRef.delete();
  }
}