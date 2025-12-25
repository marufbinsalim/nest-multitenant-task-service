import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repostiory';
import { User } from './entities/user.enitity';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UserRepository) {}

    async findByEmail(email: string) {
        return await this.usersRepository.findByEmail(email);
    }

    async findById(id: string) {
        return await this.usersRepository.findById(id);
    }

    async createUser(data: Partial<User>) {
        return await this.usersRepository.createUser(data);
    }
}
