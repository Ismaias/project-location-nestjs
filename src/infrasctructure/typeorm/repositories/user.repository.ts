import { User, UserRepository } from "@app/domain";
import { Injectable } from "@nestjs/common";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "@app/infrasctructure";

@Injectable()
export class UserDatabaseRepository implements UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) { }

  create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData)
    return this.userRepository.save(user);
  }

  getByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

}
