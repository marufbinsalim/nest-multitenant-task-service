import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '../repository/refreshtoken.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly refreshTokenRepository : RefreshTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async generateAuthTokens(user: {
    id: number;
    email: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {

    const payload = { sub: user.id, email: user.email };


    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'access-secret',
      expiresIn: '15m',
    });

    const refreshTokenValue = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
      expiresIn: '7d',
    });

    await this.refreshTokenRepository.createRefreshToken(
      refreshTokenValue,
      user as any,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    );

    return { accessToken, refreshToken: refreshTokenValue };
  }

  async verifyAndRefreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret' });
      const tokenEntity = await this.refreshTokenRepository.findByToken(refreshToken);
      if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return this.generateAuthTokens(tokenEntity.user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async invalidateRefreshToken(refreshToken: string): Promise<void> {
    await this.refreshTokenRepository.deleteByToken(refreshToken);
  }

  verifyAccessToken(accessToken: string): any {
    try {
      const payload = this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET || 'access-secret' });
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}