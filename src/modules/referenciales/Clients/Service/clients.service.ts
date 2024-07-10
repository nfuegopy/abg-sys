import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateClientsDTO } from '../Dto/create-clients.dto';
import { UpdateClientsDTO } from '../Dto/update-clients.dto';
import { ClientsInterface } from '../Interfaces/clients.interface';


@Injectable()
export class ClientsService{
private firestore: FirebaseFirestore.Firestore;
constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App){
    this.firestore=firebaseAdmin.firestore();
}
async create(createClientsDto: CreateClientsDTO): Promise<ClientsInterface>{
    const {first_name,ci_ruc,last_name,phone,email,address} = createClientsDto;
    const clientsData: ClientsInterface = {first_name, ci_ruc, last_name, phone, email, address, created_at: new Date(), updated_at: new Date()};
    const clientsRef = this.firestore.collection('clients').doc();
    await clientsRef.set(clientsData);
    return{id: clientsRef.id, ...clientsData};
}

//Esta sintaxis es para insertar varios registros de una vez
async createMultiple(createClientsDtos: CreateClientsDTO[]): Promise<ClientsInterface[]> {
    const batch = this.firestore.batch();
    const clientsDataArray: ClientsInterface[] = [];

    for (const createClientsDto of createClientsDtos) {
      const { first_name, ci_ruc, last_name, phone, email, address } = createClientsDto;
      const clientsData: ClientsInterface = { first_name, ci_ruc, last_name, phone, email, address, created_at: new Date(), updated_at: new Date() };
      const clientsRef = this.firestore.collection('clients').doc();
      batch.set(clientsRef, clientsData);
      clientsDataArray.push({ id: clientsRef.id, ...clientsData });
    }

    await batch.commit();
    return clientsDataArray;
  }
//Solo fue un agregado ara prueba 
async findAll(): Promise<ClientsInterface[]>{
    const snapshot = await this.firestore.collection('clients').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientsInterface));
}

async findOne(id: string): Promise<ClientsInterface>{
    const doc = await this.firestore.collection('clients').doc(id).get();
    if (!doc.exists) {
        throw new NotFoundException(`Cliente con el ID ${id} no enonctrado`);
      }
      return { id: doc.id, ...doc.data() } as ClientsInterface;
}



async update  (id: string, updateClientsDto: UpdateClientsDTO): Promise<ClientsInterface>{
    const docRef = this.firestore.collection('clients').doc(id);
    const doc = await docRef.get();
    if(!doc.exists){
        throw new NotFoundException(`Cliente con el ID ${id} no encontrado`)
    }

    const updateData = {...updateClientsDto, updated_at:new Date()};
    await docRef.update(updateData);

    const updateDoc = await docRef.get();
    return {id: updateDoc.id, ...updateDoc.data()} as ClientsInterface;
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