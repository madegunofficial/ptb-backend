/**
 * @file ptb-backend/src/payments/dto/payment-callback.dto.ts
 * @description DTO for Midtrans Webhook Callback
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentCallbackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status_code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gross_amount: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  signature_key: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transaction_status: string;
}
