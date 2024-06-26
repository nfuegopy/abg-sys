// src/modules/user_roles/service/user-role.service.ts
import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserRoleDto } from '../dto/create-user-role.dto';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { UserRole } from '../interfaces/user-role.interface';

@Injectable()
export class UserRoleService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  private async validateUserAndRoleExist(user_id: string, role_id: string): Promise<void> {
    const userDoc = await this.firestore.collection('users').doc(user_id).get();
    if (!userDoc.exists) {
      console.error(`User with ID ${user_id} does not exist`);
      throw new BadRequestException(`Usuario con el ID ${user_id} no existe`);
    }
    console.log(`User with ID ${user_id} exists`);

    const roleDoc = await this.firestore.collection('roles').doc(role_id).get();
    if (!roleDoc.exists) {
      console.error(`Role with ID ${role_id} does not exist`);
      throw new BadRequestException(`Rol con ese ID ${role_id} no existe`);
    }
    console.log(`Role with ID ${role_id} exists`);
  }

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    const { user_id, role_id } = createUserRoleDto;

    // Verificar que el usuario y el rol existen
    await this.validateUserAndRoleExist(user_id, role_id);

    const userRoleData: UserRole = {
      user_id,
      role_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const userRoleRef = this.firestore.collection('user_roles').doc();
    await userRoleRef.set(userRoleData);

    return { ...userRoleData };
  }

  async findAll(): Promise<UserRole[]> {
    const snapshot = await this.firestore.collection('user_roles').get();
    return snapshot.docs.map(doc => ({ ...doc.data() } as UserRole));
  }

  async findOne(user_id: string, role_id: string): Promise<UserRole> {
    const snapshot = await this.firestore.collection('user_roles')
      .where('user_id', '==', user_id)
      .where('role_id', '==', role_id)
      .get();

    if (snapshot.empty) {
      throw new NotFoundException(`UserRole with user_id ${user_id} and role_id ${role_id} not found`);
    }

    const doc = snapshot.docs[0];
    return { ...doc.data() } as UserRole;
  }

  async update(user_id: string, role_id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole> {
    const snapshot = await this.firestore.collection('user_roles')
      .where('user_id', '==', user_id)
      .where('role_id', '==', role_id)
      .get();

    if (snapshot.empty) {
      throw new NotFoundException(`UserRole with user_id ${user_id} and role_id ${role_id} not found`);
    }

    const docRef = snapshot.docs[0].ref;
    const updatedData = { ...updateUserRoleDto, updated_at: new Date() };
    await docRef.update(updatedData);

    const updatedDoc = await docRef.get();
    return { ...updatedDoc.data() } as UserRole;
  }

  async remove(user_id: string, role_id: string): Promise<void> {
    const snapshot = await this.firestore.collection('user_roles')
      .where('user_id', '==', user_id)
      .where('role_id', '==', role_id)
      .get();

    if (snapshot.empty) {
      throw new NotFoundException(`UserRole with user_id ${user_id} and role_id ${role_id} not found`);
    }

    const docRef = snapshot.docs[0].ref;
    await docRef.delete();
  }
}
