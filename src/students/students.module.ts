/**
 * @file ptb-backend/src/students/students.module.ts
 * @description Module declaration for Students feature
 */

import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
