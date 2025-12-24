import { Permission } from 'src/role-permissions/entities/permission.entity';
import { DataSource } from 'typeorm';

export const permissionSeeder = async (dataSource: DataSource) => {
  const permissionRepo = dataSource.getRepository(Permission);

  const permissions = [
    'user.create',
    'user.update',
    'user.delete',
    'organization.view',
    'organization.update',
    'role.manage',
  ];

  for (const name of permissions) {
    const exists = await permissionRepo.findOne({ where: { name } });

    if (!exists) {
      await permissionRepo.save(permissionRepo.create({ name }));
    }
  }

  console.log('✅ Permissions seeded');
};
