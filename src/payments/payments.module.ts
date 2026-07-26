/**
 * @file ptb-backend/src/payments/payments.module.ts
 * @description Module definition for Payments feature
 */

import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MidtransService } from './midtrans.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, MidtransService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
