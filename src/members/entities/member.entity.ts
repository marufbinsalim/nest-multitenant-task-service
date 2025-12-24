import { User } from 'src/users/entities/user.enitity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Role } from 'src/role-permissions/entities/role.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;
  @ManyToOne(() => User, (user) => user.members)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  organization_id: string;
  @ManyToOne(() => Organization, (organization) => organization.members, { nullable: true })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column({ nullable: false })
  role_id: number;
  @ManyToOne(() => Role, (role) => role.members)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}