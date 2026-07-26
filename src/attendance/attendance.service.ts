/**
 * @file ptb-backend/src/attendance/attendance.service.ts
 * @description Attendance management service
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BulkAttendanceDto } from './dto/bulk-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async saveBulk(dto: BulkAttendanceDto, recordedUserId: string) {
    const sessionDate = new Date(dto.sessionDate);

    const ops = dto.records.map((r) =>
      this.prisma.attendance.create({
        data: {
          studentId: r.studentId,
          sessionDate,
          sessionType: dto.sessionType,
          status: r.status,
          notes: r.notes,
          recordedById: recordedUserId,
        },
      })
    );

    return Promise.all(ops);
  }

  async getStats(studentId: string) {
    const records = await this.prisma.attendance.findMany({ where: { studentId } });
    const total = records.length;
    const hadir = records.filter((r) => r.status === 'PRESENT').length;
    const izin = records.filter((r) => r.status === 'PERMIT').length;
    const sakit = records.filter((r) => r.status === 'SICK').length;
    const alpha = records.filter((r) => r.status === 'ABSENT').length;

    const rate = total > 0 ? Math.round((hadir / total) * 100) : 0;

    return { total, hadir, izin, sakit, alpha, rate };
  }
}
