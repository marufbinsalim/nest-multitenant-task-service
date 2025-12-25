import { User } from 'src/users/entities/user.enitity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Role } from 'src/role-permissions/entities/role.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: string;
  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  organization_id: string;
  @ManyToOne(() => Organization, (organization) => organization.userRoles, { nullable: true })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column({ nullable: false })
  role_id: number;
  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}