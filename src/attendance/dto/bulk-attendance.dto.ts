/**
 * @file ptb-backend/src/attendance/dto/bulk-attendance.dto.ts
 * @description DTO for bulk attendance recording
 */

import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus, SessionType } from '@prisma/client';

export class AttendanceRecordDto {
  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ enum: AttendanceStatus, default: AttendanceStatus.PRESENT })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @ApiProperty({ example: 'Izin sakit', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class BulkAttendanceDto {
  @ApiProperty({ example: '2026-07-26' })
  @IsDateString()
  sessionDate: string;

  @ApiProperty({ enum: SessionType, default: SessionType.REGULAR_PRACTICE })
  @IsEnum(SessionType)
  sessionType: SessionType;

  @ApiProperty({ type: [AttendanceRecordDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceRecordDto)
  records: AttendanceRecordDto[];
}
