/**
 * @file ptb-backend/src/attendance/attendance.service.spec.ts
 * @description Unit tests for NestJS AttendanceService
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AttendanceService', () => {
  let service: AttendanceService;

  const mockPrismaService = {
    attendance: {
      findMany: jest.fn().mockResolvedValue([
        { status: 'PRESENT' },
        { status: 'PRESENT' },
        { status: 'PERMIT' },
      ]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
  });

  it('should calculate attendance percentage correctly', async () => {
    const stats = await service.getStats('s1');
    expect(stats.total).toBe(3);
    expect(stats.hadir).toBe(2);
    expect(stats.rate).toBe(67);
  });
});
