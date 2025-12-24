import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRepository } from './repositories/member.repository';

@Injectable()
export class MembersService {
  constructor(private readonly memberRepo: MemberRepository) {}

  async create(createMemberDto: CreateMemberDto): Promise<any> {
    try {
      const member = await this.memberRepo.create(createMemberDto);
      return member;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findAll(): Promise<any[]> {
    return this.memberRepo.findAll();
  }

  async findOne(id: number): Promise<any> {
    return this.memberRepo.findOne(id);
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<any> {
    return this.memberRepo.update(id, updateMemberDto);
  }

  async remove(id: number): Promise<void> {
    return this.memberRepo.remove(id);
  }
}