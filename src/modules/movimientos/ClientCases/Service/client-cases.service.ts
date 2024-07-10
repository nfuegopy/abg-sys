import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateClientCaseDTO } from '../Dto/create-client-case.dto';
import { UpdateClientCaseDTO } from '../Dto/update-client-case.dto';
import { ClientCaseInterface } from '../Interface/client-case.interface';

@Injectable()
export class ClientCasesService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  async create(createClientCaseDto: CreateClientCaseDTO): Promise<ClientCaseInterface> {
    const clientCaseData: ClientCaseInterface = {
      ...createClientCaseDto,
      created_at: new Date(),
      updated_at: new Date()
    };
    const clientCaseRef = this.firestore.collection('client_cases').doc();
    await clientCaseRef.set(clientCaseData);
    return { id: clientCaseRef.id, ...clientCaseData };
  }

  async findAll(): Promise<ClientCaseInterface[]> {
    const snapshot = await this.firestore.collection('client_cases').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientCaseInterface));
  }

  async findOne(id: string): Promise<ClientCaseInterface> {
    const doc = await this.firestore.collection('client_cases').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Client Case with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as ClientCaseInterface;
  }

  async update(id: string, updateClientCaseDto: UpdateClientCaseDTO): Promise<ClientCaseInterface> {
    const docRef = this.firestore.collection('client_cases').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Client Case with ID ${id} not found`);
    }
    const updateData = { ...updateClientCaseDto, updated_at: new Date() };
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as ClientCaseInterface;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('client_cases').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Client Case with ID ${id} not found`);
    }
    await docRef.delete();
  }
}