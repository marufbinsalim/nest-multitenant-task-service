import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './repository/user.repostiory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
  ],
  providers: [
    UsersService,
    UserRepository, 
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule { }
