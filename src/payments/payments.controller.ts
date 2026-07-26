/**
 * @file ptb-backend/src/payments/payments.controller.ts
 * @description REST API Endpoints for SPP payments and Midtrans webhook
 */

import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { PaymentCallbackDto } from './dto/payment-callback.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get('student/:studentId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Ambil riwayat tagihan murid' })
  getStudentPayments(@Param('studentId') studentId: string) {
    return this.paymentsService.getStudentPayments(studentId);
  }

  @Post('initiate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Inisiasi transaksi pembayaran SPP via QRIS Midtrans' })
  initiateQris(@Body() dto: InitiatePaymentDto) {
    return this.paymentsService.initiateQris(dto);
  }

  @Post('callback')
  @ApiOperation({ summary: 'Webhook Midtrans Payment Notification (Public Callback)' })
  handleCallback(@Body() dto: PaymentCallbackDto) {
    return this.paymentsService.handleCallback(dto);
  }

  @Put(':id/manual-paid')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Tandai pembayaran SPP sebagai LUNAS secara manual/tunai (Admin)' })
  markManualPaid(@Param('id') id: string) {
    return this.paymentsService.markManualPaid(id);
  }
}
