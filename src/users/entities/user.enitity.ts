import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Organization, (organization) => organization.user)
  organizations: Organization[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
