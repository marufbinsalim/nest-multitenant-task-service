import { permissionSeeder } from './permission.seeder';
import { roleSeeder } from './role.seeder';
import { AppDataSource } from '../data-source';

async function runSeed() {
  await AppDataSource.initialize();

  await permissionSeeder(AppDataSource);
  await roleSeeder(AppDataSource);

  await AppDataSource.destroy();
}

runSeed();
