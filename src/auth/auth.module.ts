import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { User } from 'src/users/entities/user.enitity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken, User]), 
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
