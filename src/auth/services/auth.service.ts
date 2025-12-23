import * as bcrypt from 'bcrypt';
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { RefreshDto } from '../dto/refresh.dto';
import { LogoutDto } from '../dto/logout.dto';
import { MeDto } from '../dto/me.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signUpDto;
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser({ email, password: hashedPassword });
    return this.tokenService.generateAuthTokens(user);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.tokenService.generateAuthTokens(user);
  }

  async refreshToken(refreshDto: RefreshDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken } = refreshDto;
    return this.tokenService.verifyAndRefreshTokens(refreshToken);
  }

  async logout(logoutDto: LogoutDto): Promise<void> {
    const { refreshToken } = logoutDto;
    await this.tokenService.invalidateRefreshToken(refreshToken);
  }


  async getUser(meDto: MeDto): Promise<any> {
    const { accessToken } = meDto;
    const payload = this.tokenService.verifyAccessToken(accessToken);

    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid access token');
    }
    return user;
  }


}
