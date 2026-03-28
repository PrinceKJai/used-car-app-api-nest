import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)private usersRepo: Repository<User>){}

    async create(email: string, password: string) {
        const user = this.usersRepo.create({ email, password});
        await this.usersRepo.save(user);
    }

    async findOne(id: number) {
        const user = await this.usersRepo.findOneBy({ id });
        return user;
    }
}
