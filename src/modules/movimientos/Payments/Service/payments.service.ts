import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreatePaymentDTO } from '../dto/create-payment.dto';
import { UpdatePaymentDTO } from '../dto/update-payment.dto';
import { PaymentInterface } from '../interface/payment.interface';

@Injectable()
export class PaymentsService {
  private firestore: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App) {
    this.firestore = firebaseAdmin.firestore();
  }

  async create(createPaymentDto: CreatePaymentDTO): Promise<PaymentInterface> {
    const paymentData: PaymentInterface = {
      ...createPaymentDto,
      created_at: new Date(),
      updated_at: new Date()
    };
    const paymentRef = this.firestore.collection('payments').doc();
    await paymentRef.set(paymentData);
    return { id: paymentRef.id, ...paymentData };
  }

  async findAll(): Promise<PaymentInterface[]> {
    const snapshot = await this.firestore.collection('payments').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PaymentInterface));
  }

  async findOne(id: string): Promise<PaymentInterface> {
    const doc = await this.firestore.collection('payments').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() } as PaymentInterface;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDTO): Promise<PaymentInterface> {
    const docRef = this.firestore.collection('payments').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    const updateData = { ...updatePaymentDto, updated_at: new Date() };
    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as PaymentInterface;
  }

  async remove(id: string): Promise<void> {
    const docRef = this.firestore.collection('payments').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    await docRef.delete();
  }
}