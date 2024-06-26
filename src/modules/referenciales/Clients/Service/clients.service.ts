//import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateClientsDTO } from '../Dto/create-clients.dto';
//import { UpdateClientsDto } from '../dto/update-clients.dto';
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

async findAll(): Promise<ClientsInterface[]>{
    const snapshot = await this.firestore.collection('clients').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientsInterface));
}
}