import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { GuardsModule } from './guards/guards.module';
import { TenantService } from './tenant/tenant.service';
import { TenantModule } from './tenant/tenant.module';
import { UsersModule } from './users/users.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    OrganizationModule,
    GuardsModule,
    TenantModule,
    UsersModule,
    RolePermissionsModule
  ],
  controllers: [AppController],
  providers: [AppService, TenantService],
})
export class AppModule { }
