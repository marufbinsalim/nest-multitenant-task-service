import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { GuardsModule } from './guards/guards.module';
import { TenantService } from './tenant/tenant.service';
import { TenantModule } from './tenant/tenant.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    OrganizationModule,
    GuardsModule,
    TenantModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, TenantService],
})
export class AppModule { }
