/**
 * @file ptb-backend/src/students/students.controller.ts
 * @description Controller endpoints for Students management
 */

import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentFilterDto } from './dto/student-filter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Students')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil daftar seluruh murid' })
  findAll(@Query() filter: StudentFilterDto) {
    return this.studentsService.findAll(filter);
  }

  @Get('my-child')
  @Roles(Role.PARENT)
  @ApiOperation({ summary: 'Ambil daftar murid milik orang tua terotentikasi' })
  findMyChild(@CurrentUser('id') parentId: string) {
    return this.studentsService.findMyChild(parentId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail murid berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findById(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Tambah murid baru (Admin)' })
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Nonaktifkan murid / Soft delete' })
  remove(@Param('id') id: string) {
    return this.studentsService.delete(id);
  }
}
