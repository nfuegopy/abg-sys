// src/modules/movimientos/CaseHistory/service/case-history.service.ts

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateCaseHistoryDTO } from '../dto/create-case-history.dto';
import { UpdateCaseHistoryDTO } from '../dto/update-case-history.dto';
import { CaseHistoryInterface } from '../interfaces/case-history.interface';

@Injectable()
export class CaseHistoryService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  async create(createCaseHistoryDto: CreateCaseHistoryDTO): Promise<CaseHistoryInterface> {
    const caseHistoryData: CaseHistoryInterface = {
      ...createCaseHistoryDto,
      timestamp: new Date(),
    };
    const caseHistoryRef = this.firestore.collection('case_history').doc();
    await caseHistoryRef.set(caseHistoryData);
    return { id: caseHistoryRef.id, ...caseHistoryData };
  }

  async findAll(): Promise<CaseHistoryInterface[]> {
    const snapshot = await this.firestore.collection('case_history').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CaseHistoryInterface));
  }

  async findOne(id: string): Promise<CaseHistoryInterface> {
    const doc = await this.firestore.collection('case_history').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Case History with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as CaseHistoryInterface;
  }

  async findByCaseId(caseId: string): Promise<CaseHistoryInterface[]> {
    try {
      console.log(`Searching for case history with case_id: ${caseId}`);
      
      const snapshot = await this.firestore.collection('case_history')
        .where('case_id', '==', caseId)
        .orderBy('timestamp', 'desc')
        .get();
  
      console.log(`Query executed. Found ${snapshot.size} documents.`);
  
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as CaseHistoryInterface));
  
    } catch (error) {
      console.error('Error fetching case history:', error);
      if (error.code === 'FAILED_PRECONDITION' && error.message.includes('The query requires an index')) {
        throw new Error('El índice necesario para esta consulta aún no está listo. Por favor, espera unos minutos y vuelve a intentarlo.');
      }
      throw new Error(`Error fetching case history for case ID ${caseId}: ${error.message}`);
    }
  }
  
  async update(id: string, updateCaseHistoryDto: UpdateCaseHistoryDTO): Promise<CaseHistoryInterface> {
    const docRef = this.firestore.collection('case_history').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Case History with ID ${id} not found`);
    }
    
    // Convertir el DTO a un objeto plano
    const updateData = Object.entries(updateCaseHistoryDto).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, unknown>);

    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as CaseHistoryInterface;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('case_history').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Case History with ID ${id} not found`);
    }
    await docRef.delete();
  }


}