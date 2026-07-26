/**
 * @file ptb-backend/src/app.module.ts
 * @description Root application module linking feature modules and Prisma Service
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    StudentsModule,
    AttendanceModule,
    PaymentsModule,
  ],
})
export class AppModule {}
