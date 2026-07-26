/**
 * @file ptb-backend/src/auth/guards/jwt-auth.guard.ts
 * @description Passport JWT Auth Guard
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
