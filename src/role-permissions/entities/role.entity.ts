import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { Organization } from "src/organization/entities/organization.entity";
import { Member } from "src/members/entities/member.entity";
import { RoleScope } from "../enums/role-scope.enum";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: RoleScope, default: RoleScope.SYSTEM })
    scope: RoleScope;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Organization)
    organization: Organization

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({
        name: 'role_permissions',
        joinColumn: { name: 'roleId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' }
    })
    permissions: Permission[];

    @OneToMany(() => Member, (member) => member.role)
    members: Member[];
}