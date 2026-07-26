/**
 * @file ptb-backend/src/students/dto/student-filter.dto.ts
 * @description Query DTO for filtering students
 */

import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class StudentFilterDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ageGroupId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}
