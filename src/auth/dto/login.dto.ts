/**
 * @file ptb-backend/src/auth/dto/login.dto.ts
 * @description Data Transfer Object for User Login
 */

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@ptbfc.com', description: 'Alamat email terdaftar' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email wajib diisi' })
  email: string;

  @ApiProperty({ example: 'admin123', description: 'Password akun' })
  @IsString()
  @IsNotEmpty({ message: 'Password wajib diisi' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;
}
