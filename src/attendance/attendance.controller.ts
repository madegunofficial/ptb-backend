/**
 * @file ptb-backend/src/attendance/attendance.controller.ts
 * @description Attendance REST Controller
 */

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { BulkAttendanceDto } from './dto/bulk-attendance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Attendance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('bulk')
  @Roles(Role.COACH, Role.ADMIN)
  @ApiOperation({ summary: 'Simpan absensi kolektif per sesi latihan' })
  saveBulk(@Body() dto: BulkAttendanceDto, @CurrentUser('id') userId: string) {
    return this.attendanceService.saveBulk(dto, userId);
  }

  @Get('stats/:studentId')
  @ApiOperation({ summary: 'Ambil statistik persentase kehadiran murid' })
  getStats(@Param('studentId') studentId: string) {
    return this.attendanceService.getStats(studentId);
  }
}
