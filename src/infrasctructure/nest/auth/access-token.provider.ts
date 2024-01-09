import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@app/domain';

@Injectable()
export class AccessTokenProvider {
  constructor(
    private jwtService: JwtService
  ) { }

  async execute(user: User) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
