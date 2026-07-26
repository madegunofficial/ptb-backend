/**
 * @file ptb-backend/src/auth/guards/local-auth.guard.ts
 * @description Passport Local Auth Guard
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
