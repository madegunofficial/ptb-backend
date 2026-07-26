/**
 * @file ptb-backend/src/payments/payments.service.ts
 * @description SPP Payments & QRIS logic handler service
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MidtransService } from './midtrans.service';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { PaymentStatus, PaymentMethod } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private midtransService: MidtransService
  ) {}

  async getStudentPayments(studentId: string) {
    return this.prisma.payment.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async initiateQris(dto: InitiatePaymentDto) {
    const student = await this.prisma.student.findUnique({
      where: { id: dto.studentId },
      include: { parent: true, user: true },
    });
    if (!student) throw new NotFoundException('Data murid tidak ditemukan');

    let payment = await this.prisma.payment.findFirst({
      where: {
        studentId: dto.studentId,
        periodMonth: dto.month,
        periodYear: dto.year,
      },
    });

    if (!payment) {
      payment = await this.prisma.payment.create({
        data: {
          studentId: dto.studentId,
          periodMonth: dto.month,
          periodYear: dto.year,
          amount: dto.amount,
          status: PaymentStatus.PENDING,
          paymentMethod: PaymentMethod.QRIS,
        },
      });
    }

    try {
      const chargeRes = await this.midtransService.createQrisTransaction(payment.id, dto.amount, {
        name: student.parent?.name || 'Orang Tua Murid',
        email: student.parent?.email || 'parent@ptbfc.com',
      });

      const qrisUrl = chargeRes.actions?.find((a: any) => a.name === 'generate-qr-code')?.url || 'assets/icon/favicon.png';

      return {
        paymentId: payment.id,
        qrisUrl,
        expiredAt: new Date(Date.now() + 30 * 60000).toISOString(),
        amount: dto.amount,
      };
    } catch (err) {
      return {
        paymentId: payment.id,
        qrisUrl: 'assets/icon/favicon.png',
        expiredAt: new Date(Date.now() + 30 * 60000).toISOString(),
        amount: dto.amount,
      };
    }
  }

  async handleCallback(payload: any) {
    const payment = await this.prisma.payment.findUnique({ where: { id: payload.order_id } });
    if (!payment) throw new NotFoundException('Transaksi tidak ditemukan');

    if (payload.transaction_status === 'settlement' || payload.transaction_status === 'capture') {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.PAID,
          paidAt: new Date(),
          qrisTransactionId: payload.transaction_id,
        },
      });
      console.log(`✅ Payment LUNAS for Order: ${payment.id}`);
    }

    return { status: 'OK' };
  }

  async markManualPaid(id: string) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        status: PaymentStatus.PAID,
        paymentMethod: PaymentMethod.CASH,
        paidAt: new Date(),
      },
    });
  }
}
