/**
 * @file ptb-backend/src/payments/dto/initiate-payment.dto.ts
 * @description DTO for initiating QRIS payment
 */

import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InitiatePaymentDto {
  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: 7 })
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty({ example: 2026 })
  @IsInt()
  year: number;

  @ApiProperty({ example: 350000 })
  @IsNumber()
  @Min(10000)
  amount: number;
}
