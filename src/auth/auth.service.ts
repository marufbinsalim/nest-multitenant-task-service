import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.enitity';
import { RefreshToken } from './entities/refresh-token.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';
import { MeDto } from './dto/me.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signUpDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword });
    await this.userRepository.save(user);

    // Generate tokens
    return this.generateTokens(user);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signInDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async refreshToken(refreshDto: RefreshDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken } = refreshDto;

    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret' });

      // Find refresh token in DB
      const tokenEntity = await this.refreshTokenRepository.findOne({
        where: { token: refreshToken },
        relations: ['user'],
      });
      if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      return this.generateTokens(tokenEntity.user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(logoutDto: LogoutDto): Promise<void> {
    const { refreshToken } = logoutDto;
    await this.refreshTokenRepository.delete({ token: refreshToken });
  }


  async getUser(meDto: MeDto): Promise<any> {
    const { accessToken } = meDto;
    try {
      const payload = this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET || 'access-secret' });

      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      if (!user) {
        throw new UnauthorizedException('Invalid access token');
      }
      return user;
    }
    catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }


  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'access-secret',
      expiresIn: '10m',
    });

    const refreshTokenValue = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
      expiresIn: '7d',
    });

    // Save refresh token to DB
    const refreshTokenEntity = this.refreshTokenRepository.create({
      token: refreshTokenValue,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      user,
    });
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { accessToken, refreshToken: refreshTokenValue };
  }
}
