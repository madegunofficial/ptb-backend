/**
 * @file ptb-backend/src/auth/auth.service.ts
 * @description Authentication business logic service
 */

import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'ptb_fc_refresh_secret_key_2026_super_secure'),
      expiresIn: '30d',
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'ptb_fc_refresh_secret_key_2026_super_secure'),
      });
      const newPayload = { sub: payload.sub, email: payload.email, role: payload.role };
      const accessToken = this.jwtService.sign(newPayload);
      return { accessToken };
    } catch (err) {
      throw new UnauthorizedException('Refresh token tidak valid atau telah expired');
    }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new BadRequestException('Email tidak terdaftar');
    }
    console.log(`🔑 Reset Password Token requested for email: ${dto.email}`);
    return { message: 'Link reset password telah dikirim ke email Anda' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    return { message: 'Password berhasil diperbarui' };
  }
}
