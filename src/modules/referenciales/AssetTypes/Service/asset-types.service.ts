import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateAssetTypeDTO } from '../Dto/create-asset-type.dto';
import { UpdateAssetTypeDTO } from '../Dto/update-asset-type.dto';
import { AssetTypeInterface } from '../Interfaces/asset-type.interface';

@Injectable()
export class AssetTypesService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  async create(createAssetTypeDto: CreateAssetTypeDTO): Promise<AssetTypeInterface> {
    const { type_name, description } = createAssetTypeDto;
    const assetTypeData: AssetTypeInterface = {
      type_name,
      description,
      created_at: new Date(),
      updated_at: new Date()
    };
    const assetTypeRef = this.firestore.collection('asset_types').doc();
    await assetTypeRef.set(assetTypeData);
    return { id: assetTypeRef.id, ...assetTypeData };
  }

  async createMultiple(createAssetTypeDtos: CreateAssetTypeDTO[]): Promise<AssetTypeInterface[]> {
    const batch = this.firestore.batch();
    const assetTypesDataArray: AssetTypeInterface[] = [];

    for (const createAssetTypeDto of createAssetTypeDtos) {
      const { type_name, description } = createAssetTypeDto;
      const assetTypeData: AssetTypeInterface = {
        type_name,
        description,
        created_at: new Date(),
        updated_at: new Date()
      };
      const assetTypeRef = this.firestore.collection('asset_types').doc();
      batch.set(assetTypeRef, assetTypeData);
      assetTypesDataArray.push({ id: assetTypeRef.id, ...assetTypeData });
    }

    await batch.commit();
    return assetTypesDataArray;
  }

  async findAll(): Promise<AssetTypeInterface[]> {
    const snapshot = await this.firestore.collection('asset_types').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AssetTypeInterface));
  }

  async findOne(id: string): Promise<AssetTypeInterface> {
    const doc = await this.firestore.collection('asset_types').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Asset Type with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as AssetTypeInterface;
  }

  async update(id: string, updateAssetTypeDto: UpdateAssetTypeDTO): Promise<AssetTypeInterface> {
    const docRef = this.firestore.collection('asset_types').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Asset Type with ID ${id} not found`);
    }
    const updateData = { ...updateAssetTypeDto, updated_at: new Date() };
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as AssetTypeInterface;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('asset_types').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Asset Type with ID ${id} not found`);
    }
    await docRef.delete();
  }
}