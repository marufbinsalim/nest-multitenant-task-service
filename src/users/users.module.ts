import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './repository/user.repostiory';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
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
