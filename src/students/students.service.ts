/**
 * @file ptb-backend/src/students/students.service.ts
 * @description Service for managing Student entities
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentFilterDto } from './dto/student-filter.dto';
import { StudentStatus } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: StudentFilterDto) {
    const where: any = {};
    if (filter.ageGroupId) where.ageGroupId = filter.ageGroupId;
    if (filter.search) {
      where.OR = [
        { registrationNumber: { contains: filter.search, mode: 'insensitive' } },
        { address: { contains: filter.search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.student.findMany({
      where,
      include: { ageGroup: true, coach: { include: { user: true } }, parent: true, user: true },
    });
  }

  async findById(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: { ageGroup: true, coach: { include: { user: true } }, parent: true, user: true },
    });
    if (!student) throw new NotFoundException('Murid tidak ditemukan');
    return student;
  }

  async findMyChild(parentUserId: string) {
    return this.prisma.student.findMany({
      where: { parentId: parentUserId },
      include: { ageGroup: true, coach: true },
    });
  }

  async create(dto: CreateStudentDto) {
    const count = await this.prisma.student.count();
    const regNum = `PTB-${new Date().getFullYear()}-${(count + 1).toString().padStart(3, '0')}`;

    return this.prisma.student.create({
      data: {
        registrationNumber: regNum,
        birthDate: new Date(dto.birthDate),
        ageGroupId: dto.ageGroupId,
        coachId: dto.coachId,
        parentId: dto.parentId,
        position: dto.position,
        jerseyNumber: dto.jerseyNumber,
        address: dto.address,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.student.update({
      where: { id },
      data: { status: StudentStatus.INACTIVE },
    });
  }
}
