import { Inject, Injectable, Logger, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@app/domain';
import * as bcrypt from 'bcrypt';
import { User } from '@app/domain';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository
  ) { }

  async execute(email: string, password: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);
    Logger.debug('User find.', { user });

    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.password);
    Logger.debug('Password valid.', { passwordValid });

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    if (user && passwordValid) {
      return user;
    }

    return null;
  }
}
