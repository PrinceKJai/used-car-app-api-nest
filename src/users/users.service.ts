import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(email: string, password: string) {
    const user = this.usersRepo.create({ email, password });
    await this.usersRepo.save(user);
    return user;
  }

  async findOne(id: number) {
    if(!id) {
        return null;
    }
    const user = await this.usersRepo.findOneBy({ id });
    return user;
  }

  async find(email: string) {
    const users = await this.usersRepo.find({ where: { email } });
    return users;
  }

//   async update(id: number, email: string, password: string) {
//     const user = await this.usersRepo.findOneBy({ id });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     // Update only if values are provided
//     if (email) {
//       user.email = email;
//     }
//     if (password) {
//       user.password = password;
//     }
//     return await this.usersRepo.save(user);
//   }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error("User not found");
    }
   Object.assign(user, attrs);
    return await this.usersRepo.save(user);
  }

  async remove(id:number) {
    const user = await this.findOne(id);
    if(!user) {
        throw new Error('User not found!');
    }
    return this.usersRepo.remove(user);
  }
}
