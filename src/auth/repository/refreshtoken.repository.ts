import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repo: Repository<RefreshToken>,
  ) {}

  async createRefreshToken(token: string, user: User, expiresAt: Date): Promise<RefreshToken> {
    const refreshToken = this.repo.create({ token, user, expiresAt });
    return this.repo.save(refreshToken);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.repo.findOne({
      where: { token },
      relations: ['user'],
    });
  }

  async deleteByToken(token: string): Promise<void> {
    await this.repo.delete({ token });
  }

  async deleteExpiredTokens(): Promise<void> {
    await this.repo.delete({ expiresAt: new Date() });
  }
}
