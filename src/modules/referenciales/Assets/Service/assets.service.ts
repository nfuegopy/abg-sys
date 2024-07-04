import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateAssetDTO } from '../dto/create-asset.dto';
import { UpdateAssetDTO } from '../dto/update-asset.dto';
import { AssetInterface } from '../Interfaces/asset.interface';

@Injectable()
export class AssetsService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  async create(createAssetDto: CreateAssetDTO): Promise<AssetInterface> {
    const { type_id, description, estimated_value } = createAssetDto;
    const assetData: AssetInterface = {
      type_id,
      description,
      estimated_value,
      created_at: new Date(),
      updated_at: new Date()
    };
    const assetRef = this.firestore.collection('assets').doc();
    await assetRef.set(assetData);
    return { id: assetRef.id, ...assetData };
  }

  async createMultiple(createAssetDtos: CreateAssetDTO[]): Promise<AssetInterface[]> {
    const batch = this.firestore.batch();
    const assetsDataArray: AssetInterface[] = [];

    for (const createAssetDto of createAssetDtos) {
      const { type_id, description, estimated_value } = createAssetDto;
      const assetData: AssetInterface = {
        type_id,
        description,
        estimated_value,
        created_at: new Date(),
        updated_at: new Date()
      };
      const assetRef = this.firestore.collection('assets').doc();
      batch.set(assetRef, assetData);
      assetsDataArray.push({ id: assetRef.id, ...assetData });
    }

    await batch.commit();
    return assetsDataArray;
  }

  async findAll(): Promise<AssetInterface[]> {
    const snapshot = await this.firestore.collection('assets').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AssetInterface));
  }

  async findOne(id: string): Promise<AssetInterface> {
    const doc = await this.firestore.collection('assets').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as AssetInterface;
  }

  async update(id: string, updateAssetDto: UpdateAssetDTO): Promise<AssetInterface> {
    const docRef = this.firestore.collection('assets').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }
    const updateData = { ...updateAssetDto, updated_at: new Date() };
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as AssetInterface;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('assets').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }
    await docRef.delete();
  }
}