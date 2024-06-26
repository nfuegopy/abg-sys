import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateDefendantsDTO } from '../Dto/create-defendants.dto';
import { UpdateDefendantsDTO } from '../dto/update-defendants.dto';
import { DefendantsInterface } from '../Interfaces/defendants.interface';


@Injectable()
export class DefendantsService{
private firestore: FirebaseFirestore.Firestore;
constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App){
    this.firestore=firebaseAdmin.firestore();
}
async create(createDefendantsDTO: CreateDefendantsDTO): Promise<DefendantsInterface>{
    const {first_name,ci_ruc,last_name,phone,email,address} = createDefendantsDTO;
    const defendantsData: DefendantsInterface = {first_name, ci_ruc, last_name, phone, email, address, created_at: new Date(), updated_at: new Date()};
    const defendantsRef = this.firestore.collection('defendants').doc();
    await defendantsRef.set(defendantsData);
    return{id: defendantsRef.id, ...defendantsData};
}

//Esta sintaxis es para insertar varios registros de una vez
async createMultiple(createDefendantsDTO: CreateDefendantsDTO[]): Promise<DefendantsInterface[]> {
    const batch = this.firestore.batch();
    const defendantsDataArray: DefendantsInterface[] = [];

    for (const createDefendantsDto of createDefendantsDTO) {
      const { first_name, ci_ruc, last_name, phone, email, address } = createDefendantsDto;
      const defendantsData: DefendantsInterface = { first_name, ci_ruc, last_name, phone, email, address, created_at: new Date(), updated_at: new Date() };
      const defendantsRef = this.firestore.collection('defendants').doc();
      batch.set(defendantsRef, defendantsData);
      defendantsDataArray.push({ id: defendantsRef.id, ...defendantsData });
    }

    await batch.commit();
    return defendantsDataArray;
  }
//Solo fue un agregado ara prueba 
async findAll(): Promise<DefendantsInterface[]>{
    const snapshot = await this.firestore.collection('defendants').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DefendantsInterface));
}

async findOne(id: string): Promise<DefendantsInterface>{
    const doc = await this.firestore.collection('defendants').doc(id).get();
    if (!doc.exists) {
        throw new NotFoundException(`Demandado con el ID ${id} no encontrado`);
      }
      return { id: doc.id, ...doc.data() } as DefendantsInterface;
}



async update  (id: string, updateDefendantsDto: UpdateDefendantsDTO): Promise<DefendantsInterface>{
    const docRef = this.firestore.collection('defendants').doc(id);
    const doc = await docRef.get();
    if(!doc.exists){
        throw new NotFoundException(`Demandado con el ID ${id} no encontrado`)
    }

    const updateData = {...updateDefendantsDto, updated_at:new Date()};
    await docRef.update(updateData);

    const updateDoc = await docRef.get();
    return {id: updateDoc.id, ...updateDoc.data()} as DefendantsInterface;
}


async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('clients').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Cliente con el ID ${id} no encontrado`);
    }
    await docRef.delete();
  }


}