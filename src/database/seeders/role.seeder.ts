import { Permission } from 'src/role-permissions/entities/permission.entity';
import { Role } from 'src/role-permissions/entities/role.entity';
import { RoleScope } from 'src/role-permissions/enums/role-scope.enum';
import { DataSource } from 'typeorm';

export const roleSeeder = async (dataSource: DataSource) => {
  const roleRepo = dataSource.getRepository(Role);
  const permissionRepo = dataSource.getRepository(Permission);

  // Load permissions
  const allPermissions = await permissionRepo.find();

  const roles = [
    {
      name: 'SUPER_ADMIN',
      scope: RoleScope.SYSTEM,
      permissions: allPermissions,
    },
    {
      name: 'ORG_ADMIN',
      scope: RoleScope.ORGANIZATION,
      permissions: allPermissions.filter(p =>
        ['organization.view', 'organization.update', 'user.create'].includes(p.name),
      ),
    },
  ];

  for (const roleData of roles) {
    let role = await roleRepo.findOne({
      where: { name: roleData.name },
      relations: ['permissions'],
    });

    if (!role) {
      role = roleRepo.create({
        name: roleData.name,
        scope: roleData.scope,
      });
    }

    role.permissions = roleData.permissions;
    await roleRepo.save(role);
  }

  console.log('✅ Roles seeded');
};
