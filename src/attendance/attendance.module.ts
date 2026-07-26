/**
 * @file ptb-backend/src/attendance/attendance.module.ts
 * @description Module definition for Attendance feature
 */

import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
