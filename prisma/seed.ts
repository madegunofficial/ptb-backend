/**
 * @file ptb-backend/prisma/seed.ts
 * @description Initial Seed data script for Putra Tresna FC Backend
 */

import { PrismaClient, Role, LicenseLevel, Position, StudentStatus, AttendanceStatus, PaymentStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  const passwordHash = await bcrypt.hash('admin123', 10);

  // 1. Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ptbfc.com' },
    update: {},
    create: {
      name: 'Admin Utama PTB FC',
      email: 'admin@ptbfc.com',
      phone: '081234567890',
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  // 2. Coaches
  const coachUser1 = await prisma.user.upsert({
    where: { email: 'coach.guna@ptbfc.com' },
    update: {},
    create: {
      name: 'Coach Guna',
      email: 'coach.guna@ptbfc.com',
      phone: '081999888777',
      passwordHash,
      role: Role.COACH,
    },
  });

  const coach1 = await prisma.coach.create({
    data: {
      userId: coachUser1.id,
      licenseNumber: 'LIC-AFC-1029',
      licenseLevel: LicenseLevel.AFC_C,
      specialization: 'Tactical & Youth Development',
      experienceYears: 8,
      biography: 'Mantan pemain Bali United senior dengan lisensi kepelatihan AFC C.',
    },
  });

  // 3. Age Groups
  const ageGroupU12 = await prisma.ageGroup.create({
    data: {
      name: 'Kelompok U-12',
      minAge: 11,
      maxAge: 12,
      coachId: coach1.id,
      scheduleDays: ['Selasa', 'Kamis', 'Sabtu'],
      scheduleTime: '15:30 - 17:30 WITA',
      maxCapacity: 25,
    },
  });

  // 4. Sample Parent & Student
  const parentUser = await prisma.user.upsert({
    where: { email: 'parent.made@gmail.com' },
    update: {},
    create: {
      name: 'I Made Budiasa',
      email: 'parent.made@gmail.com',
      phone: '081234111222',
      passwordHash,
      role: Role.PARENT,
    },
  });

  const student1 = await prisma.student.create({
    data: {
      registrationNumber: 'PTB-2026-001',
      birthDate: new Date('2014-05-12'),
      ageGroupId: ageGroupU12.id,
      coachId: coach1.id,
      parentId: parentUser.id,
      position: Position.CM,
      jerseyNumber: 10,
      status: StudentStatus.ACTIVE,
      address: 'Jl. Hayam Wuruk No. 45 Denpasar',
    },
  });

  // 5. Sample Attendance
  await prisma.attendance.create({
    data: {
      studentId: student1.id,
      sessionDate: new Date('2026-07-20'),
      status: AttendanceStatus.PRESENT,
      notes: 'Hadir penuh, stamina sangat baik.',
      recordedById: adminUser.id,
    },
  });

  // 6. Sample Payment
  await prisma.payment.create({
    data: {
      studentId: student1.id,
      periodMonth: 7,
      periodYear: 2026,
      amount: 350000,
      status: PaymentStatus.PAID,
      paidAt: new Date('2026-07-05'),
    },
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

