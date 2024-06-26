import {Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUsersDto } from '../dto/create-users.dto';
import { UpdateUsersDto } from '../dto/update-users.dto';
import { Users } from 'src/modules/Admin/users/interfaces/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export  class UsersService {
private firestore: FirebaseFirestore.Firestore;
constructor(@Inject('FIREBASE_ADMIN')private readonly firebaseAdmin: admin.app.App){
this.firestore = firebaseAdmin.firestore();
}

async create(createUsersDto:CreateUsersDto): Promise<Users>{
const {name, email,password} = createUsersDto;
const hashedPassword = await bcrypt.hash(password, 10);
const usersData: Users = {name, email, password: hashedPassword,  is_active: true, create_at:  new Date(), update_at: new Date()};

const usersRef = this.firestore.collection('users').doc();
await usersRef.set(usersData);

return {id:  usersRef.id, ...usersData};
}

async findAll(): Promise<Users[]>{
    const snapshot = await this.firestore.collection('users').get();
    return snapshot.docs.map(doc=> ({id: doc.id, ...doc.data()} as Users));
}

async update  (id: string, updateUsersDto: UpdateUsersDto): Promise<Users>{
    const docRef = this.firestore.collection('users').doc(id);
    const doc = await docRef.get();
    if(!doc.exists){
        throw new NotFoundException(`Users con el ID ${id} no encontrado`)
    }

    const updateData = {...updateUsersDto, updated_at:new Date()};
    await docRef.update(updateData);

    const updateDoc = await docRef.get();
    return {id: updateDoc.id, ...updateDoc.data()} as Users;
}

async findOne(id: string): Promise<Users> {
  const doc = await this.firestore.collection('users').doc(id).get();
  if (!doc.exists) {
    throw new NotFoundException(`Usuario con el ID ${id} no enonctrado`);
  }
  return { id: doc.id, ...doc.data() } as Users;
}

async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('users').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Usuario con el ID ${id} no encontrado`);
    }
    await docRef.delete();
  }


}