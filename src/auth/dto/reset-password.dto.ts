/**
 * @file ptb-backend/src/auth/dto/reset-password.dto.ts
 * @description DTO for setting new password
 */

import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'reset-token-uuid-123' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'newpassword123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password baru minimal 6 karakter' })
  newPassword: string;
}
