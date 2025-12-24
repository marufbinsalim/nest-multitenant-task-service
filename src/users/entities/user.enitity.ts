import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Member } from 'src/members/entities/member.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Organization, (organization) => organization.user)
  organizations: Organization[];

  @OneToMany(() => Member, (member) => member.user)
  members: Member[];
}
