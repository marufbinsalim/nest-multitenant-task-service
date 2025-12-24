import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../entities/member.entity';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  async create(data: Partial<Member>): Promise<Member> {
    const member = this.memberRepo.create(data);
    return this.memberRepo.save(member);
  }

  async findAll(): Promise<Member[]> {
    return this.memberRepo.find({
      relations: ['user', 'organization', 'role'],
    });
  }

  async findOne(id: number): Promise<Member | null> {
    return this.memberRepo.findOne({
      where: { id },
      relations: ['user', 'organization', 'role'],
    });
  }

  async update(id: number, data: Partial<Member>): Promise<Member | null> {
    await this.memberRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.memberRepo.delete(id);
  }
}