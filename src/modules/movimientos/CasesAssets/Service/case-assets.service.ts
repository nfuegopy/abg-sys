import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateCaseAssetDTO } from '../Dto/create-case-asset.dto';
import { UpdateCaseAssetDTO } from '../Dto/update-case-asset.dto';
import { CaseAssetInterface } from '../Interface/case-asset.interface';

@Injectable()
export class CaseAssetsService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  async create(createCaseAssetDto: CreateCaseAssetDTO): Promise<CaseAssetInterface> {
    const caseAssetData: CaseAssetInterface = {
      ...createCaseAssetDto,
      created_at: new Date(),
      updated_at: new Date()
    };
    const caseAssetRef = this.firestore.collection('case_assets').doc();
    await caseAssetRef.set(caseAssetData);
    return { id: caseAssetRef.id, ...caseAssetData };
  }

  async findAll(): Promise<CaseAssetInterface[]> {
    const snapshot = await this.firestore.collection('case_assets').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CaseAssetInterface));
  }

  async findOne(id: string): Promise<CaseAssetInterface> {
    const doc = await this.firestore.collection('case_assets').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Case Asset with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as CaseAssetInterface;
  }

  async update(id: string, updateCaseAssetDto: UpdateCaseAssetDTO): Promise<CaseAssetInterface> {
    const docRef = this.firestore.collection('case_assets').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Case Asset with ID ${id} not found`);
    }
    const updateData = { ...updateCaseAssetDto, updated_at: new Date() };
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as CaseAssetInterface;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('case_assets').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Case Asset with ID ${id} not found`);
    }
    await docRef.delete();
  }
}