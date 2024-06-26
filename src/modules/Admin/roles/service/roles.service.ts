import {Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateRolesDto } from '../dto/create-roles.dto';
import { UpdateRolesDto } from '../dto/update-roles.dto';
import { Roles } from '../interfaces/roles.interface';


@Injectable()
export  class RolesService {
private firestore: FirebaseFirestore.Firestore;
constructor(@Inject('FIREBASE_ADMIN')private readonly firebaseAdmin: admin.app.App){
this.firestore = firebaseAdmin.firestore();
}

async create(createRolesDto:CreateRolesDto): Promise<Roles>{
const {name} = createRolesDto;

const rolesData: Roles = {name, create_at:  new Date(), update_at: new Date()};

const rolesRef = this.firestore.collection('roles').doc();
await rolesRef.set(rolesData);

return {id:  rolesRef.id, ...rolesData};
}

async findAll(): Promise<Roles[]>{
    const snapshot = await this.firestore.collection('roles').get();
    return snapshot.docs.map(doc=> ({id: doc.id, ...doc.data()} as Roles));
}

async update  (id: string, updateRolesDto: UpdateRolesDto): Promise<Roles>{
    const docRef = this.firestore.collection('roles').doc(id);
    const doc = await docRef.get();
    if(!doc.exists){
        throw new NotFoundException(`Rol con el ID ${id} no encontrado`)
    }

    const updateData = {...updateRolesDto, updated_at:new Date()};
    await docRef.update(updateData);

    const updateDoc = await docRef.get();
    return {id: updateDoc.id, ...updateDoc.data()} as Roles;
}

async findOne(id: string): Promise<Roles> {
  const doc = await this.firestore.collection('roles').doc(id).get();
  if (!doc.exists) {
    throw new NotFoundException(`Rol con el ID ${id} no encontrado`);
  }
  return { id: doc.id, ...doc.data() } as Roles;
}

async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('roles').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Rol con el ID ${id} no encontrado`);
    }
    await docRef.delete();
  }


}