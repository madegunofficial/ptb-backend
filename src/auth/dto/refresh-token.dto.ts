/**
 * @file ptb-backend/src/auth/dto/refresh-token.dto.ts
 * @description DTO for refreshing access token
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
