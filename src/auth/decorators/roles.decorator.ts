/**
 * @file ptb-backend/src/auth/decorators/roles.decorator.ts
 * @description Role-based access control decorator
 */

import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
