/**
 * @file ptb-backend/src/students/dto/create-student.dto.ts
 * @description DTO for creating a new student record
 */

import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Position } from '@prisma/client';

export class CreateStudentDto {
  @ApiProperty({ example: '2014-05-12' })
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({ example: 'age-group-uuid' })
  @IsString()
  @IsNotEmpty()
  ageGroupId: string;

  @ApiProperty({ example: 'coach-uuid', required: false })
  @IsString()
  @IsOptional()
  coachId?: string;

  @ApiProperty({ example: 'parent-user-uuid', required: false })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiProperty({ enum: Position, default: Position.CM })
  @IsEnum(Position)
  @IsOptional()
  position?: Position;

  @ApiProperty({ example: 10, required: false })
  @IsInt()
  @IsOptional()
  jerseyNumber?: number;

  @ApiProperty({ example: 'Jl. Hayam Wuruk No. 45 Denpasar' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
