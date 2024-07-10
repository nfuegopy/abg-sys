// import { Injectable, Inject, NotFoundException } from '@nestjs/common';
// import * as admin from 'firebase-admin';
// import { CreateCaseDTO } from '../dto/create-case.dto';
// import { UpdateCaseDTO } from '../dto/update-case.dto';
// import { CaseInterface } from '../interface/case.interface';

// @Injectable()
// export class CasesService {
//   private firestore: FirebaseFirestore.Firestore;

//   constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
//     this.firestore = firebaseAdmin.firestore();
//   }

//   async create(createCaseDto: CreateCaseDTO): Promise<CaseInterface> {
//     const caseData: CaseInterface = {
//       ...createCaseDto,
//       created_at: new Date(),
//       updated_at: new Date()
//     };
//     const caseRef = this.firestore.collection('cases').doc();
//     await caseRef.set(caseData);
//     return { id: caseRef.id, ...caseData };
//   }

//   async findAll(): Promise<CaseInterface[]> {
//     const snapshot = await this.firestore.collection('cases').get();
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CaseInterface));
//   }

//   async findOne(id: string): Promise<CaseInterface> {
//     const doc = await this.firestore.collection('cases').doc(id).get();
//     if (!doc.exists) {
//       throw new NotFoundException(`Case with ID ${id} not found`);
//     }
//     return { id: doc.id, ...doc.data() } as CaseInterface;
//   }

//   async update(id: string, updateCaseDto: UpdateCaseDTO): Promise<CaseInterface> {
//     const docRef = this.firestore.collection('cases').doc(id);
//     const doc = await docRef.get();
//     if (!doc.exists) {
//       throw new NotFoundException(`Case with ID ${id} not found`);
//     }
//     const updateData = { ...updateCaseDto, updated_at: new Date() };
//     await docRef.update(updateData);
//     const updatedDoc = await docRef.get();
//     return { id: updatedDoc.id, ...updatedDoc.data() } as CaseInterface;
//   }

//   async remove(id: string): Promise<void> {
//     const docRef = this.firestore.collection('cases').doc(id);
//     const doc = await docRef.get();
//     if (!doc.exists) {
//       throw new NotFoundException(`Case with ID ${id} not found`);
//     }
//     await docRef.delete();
//   }
// }

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateCaseDTO } from '../Dto/create-case.dto';
import { UpdateCaseDTO } from '../Dto/update-case.dto';
import { CaseInterface } from '../Interface/case.interface';
import { CaseHistoryService } from '../../CaseHistory/Service/case-history.service';

@Injectable()
export class CasesService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
    private readonly caseHistoryService: CaseHistoryService
  ) {
    this.firestore = firebaseAdmin.firestore();
  }

  private toRecord<T extends object>(obj: T): Record<string, unknown> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, unknown>);
  }

  async create(createCaseDto: CreateCaseDTO, userId: string): Promise<CaseInterface> {
    const caseData: CaseInterface = {
      ...createCaseDto,
      created_at: new Date(),
      updated_at: new Date()
    };
    const caseRef = this.firestore.collection('cases').doc();
    await caseRef.set(caseData);
    const createdCase = { id: caseRef.id, ...caseData };

    // Registrar la creación en el histórico
    await this.caseHistoryService.create({
      case_id: createdCase.id,
      action_type: 'CREATE',
      description: 'Case created',
      changed_fields: this.toRecord(createCaseDto),
      user_id: userId,
    });

    return createdCase;
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

  async update(id: string, updateCaseDto: UpdateCaseDTO, userId: string): Promise<CaseInterface> {
    const docRef = this.firestore.collection('cases').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    const updateData = { ...updateCaseDto, updated_at: new Date() };
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    const updatedCase = { id: updatedDoc.id, ...updatedDoc.data() } as CaseInterface;

    // Registrar la actualización en el histórico
    await this.caseHistoryService.create({
      case_id: id,
      action_type: 'UPDATE',
      description: 'Case updated',
      changed_fields: this.toRecord(updateCaseDto),
      user_id: userId,
    });

    return updatedCase;
  }

  async remove(id: string, userId: string): Promise<void> {
    const docRef = this.firestore.collection('cases').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    await docRef.delete();

    // Registrar la eliminación en el histórico
    await this.caseHistoryService.create({
      case_id: id,
      action_type: 'DELETE',
      description: 'Case deleted',
      changed_fields: {},
      user_id: userId,
    });
  }
}