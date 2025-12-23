import { Injectable, Inject } from "@nestjs/common";
import { eq, lt } from "drizzle-orm";
import { DRIZZLE_DB } from "../../database/database.module";
import type { DrizzleDB } from "../../database/drizzle.config";
import { refreshTokens, RefreshToken, NewRefreshToken, users, User } from "../../database/schema";

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: DrizzleDB,
  ) {}

  async createRefreshToken(token: string, user: User, expiresAt: Date): Promise<RefreshToken> {
    const result = await this.db.insert(refreshTokens).values({
      token,
      userId: user.id,
      expiresAt,
    }).returning();
    return result[0];
  }

  async findByToken(token: string): Promise<(RefreshToken & { user: User }) | null> {
    const result = await this.db
      .select()
      .from(refreshTokens)
      .innerJoin(users, eq(refreshTokens.userId, users.id))
      .where(eq(refreshTokens.token, token));
    
    if (result.length === 0) return null;
    
    return {
      ...result[0].refresh_tokens,
      user: result[0].users,
    };
  }

  async deleteByToken(token: string): Promise<void> {
    await this.db.delete(refreshTokens).where(eq(refreshTokens.token, token));
  }

  async deleteExpiredTokens(): Promise<void> {
    await this.db.delete(refreshTokens).where(lt(refreshTokens.expiresAt, new Date()));
  }
}
