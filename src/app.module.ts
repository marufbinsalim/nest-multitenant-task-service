import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    OrganizationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
