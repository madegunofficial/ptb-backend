/**
 * @file ptb-backend/src/auth/dto/forgot-password.dto.ts
 * @description DTO for requesting password reset link
 */

import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'parent.made@gmail.com' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email wajib diisi' })
  email: string;
}
