import { Injectable, Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE_DB } from "../../database/database.module";
import type { DrizzleDB } from "../../database/drizzle.config";
import { users, User, NewUser } from "../../database/schema";

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: DrizzleDB,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async findById(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async createUser(data: NewUser): Promise<User> {
    const result = await this.db.insert(users).values(data).returning();
    return result[0];
  }
}
