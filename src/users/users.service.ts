import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repostiory';
import { User, NewUser } from '../database/schema';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UserRepository) {}

    async findByEmail(email: string): Promise<User | undefined> {
        return await this.usersRepository.findByEmail(email);
    }

    async findById(id: number): Promise<User | undefined> {
        return await this.usersRepository.findById(id);
    }

    async createUser(data: NewUser): Promise<User> {
        return await this.usersRepository.createUser(data);
    }
}
