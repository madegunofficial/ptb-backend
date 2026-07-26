/**
 * @file ptb-backend/src/payments/midtrans.service.ts
 * @description Midtrans Client Integration Service for QRIS Transactions
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as MidtransClient from 'midtrans-client';
import * as crypto from 'crypto';

@Injectable()
export class MidtransService {
  private coreApi: any;

  constructor(private configService: ConfigService) {
    const isProduction = this.configService.get<boolean>('MIDTRANS_IS_PRODUCTION', false);
    const serverKey = this.configService.get<string>('MIDTRANS_SERVER_KEY', 'SB-Mid-server-YOUR_SERVER_KEY');
    const clientKey = this.configService.get<string>('MIDTRANS_CLIENT_KEY', 'SB-Mid-client-YOUR_CLIENT_KEY');

    this.coreApi = new MidtransClient.CoreApi({
      isProduction,
      serverKey,
      clientKey,
    });
  }

  async createQrisTransaction(orderId: string, amount: number, customerDetails: { name: string; email: string }) {
    const parameter = {
      payment_type: 'gopay',
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: customerDetails.name,
        email: customerDetails.email,
      },
    };

    return this.coreApi.charge(parameter);
  }

  async getTransactionStatus(orderId: string) {
    return this.coreApi.transaction.status(orderId);
  }

  verifySignature(orderId: string, statusCode: string, grossAmount: string, serverKey: string, signatureKey: string): boolean {
    const hash = crypto
      .createHash('sha512')
      .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
      .digest('hex');
    return hash === signatureKey;
  }
}
