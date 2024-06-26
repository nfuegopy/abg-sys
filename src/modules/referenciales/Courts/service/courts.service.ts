import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {CreateCourtsDTO} from '../dto/create-courts.dto';
import { UpdateCourtsDTO } from '../dto/update-courts.dto';
import { CourtsInterface } from '../interface/courts.interface';

@Injectable()
export class CourtsService{
private firestore: FirebaseFirestore.Firestore;
constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App){
    this.firestore=firebaseAdmin.firestore();
}
async create(createCourtsDTO: CreateCourtsDTO): Promise<CourtsInterface>{
    const {name,phone,email,address} = createCourtsDTO;
    const courtsData: CourtsInterface = {name,phone,email,address,created_at: new Date(), updated_at: new Date()};
    const courtsRef = this.firestore.collection('courts').doc();
    await courtsRef.set(courtsData);
    return{id: courtsRef.id, ...courtsData};
}



async findAll(): Promise<CourtsInterface[]>{
    const snapshot = await this.firestore.collection('courts').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CourtsInterface));
}

async findOne(id: string): Promise<CourtsInterface>{
    const doc = await this.firestore.collection('courts').doc(id).get();
    if (!doc.exists) {
        throw new NotFoundException(`Juzgado con el ID ${id} no encontrado`);
      }
      return { id: doc.id, ...doc.data() } as CourtsInterface;
}


async update  (id: string, updateCourtsDto: UpdateCourtsDTO): Promise<CourtsInterface>{
    const docRef = this.firestore.collection('courts').doc(id);
    const doc = await docRef.get();
    if(!doc.exists){
        throw new NotFoundException(`Juzgado con el ID ${id} no encontrado`)
    }

    const updateData = {...updateCourtsDto, updated_at:new Date()};
    await docRef.update(updateData);

    const updateDoc = await docRef.get();
    return {id: updateDoc.id, ...updateDoc.data()} as CourtsInterface;
}


async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('courts').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Juzgado con el ID ${id} no encontrado`);
    }
    await docRef.delete();
  }




}
