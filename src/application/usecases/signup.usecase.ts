import { UserEntity, UserRepository } from "@app/domain";
import { Inject, Injectable, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignupUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) { }

  async execute(email: string, password: string): Promise<void> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    Logger.debug('hashedPassword created.', { hashedPassword });
    const user = new UserEntity({
      email,
      password: hashedPassword
    });

    await this.userRepository.create(user);

    Logger.debug('Signup created.', { user });
  }
}
