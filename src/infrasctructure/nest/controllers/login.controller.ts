import { Controller, Post, Logger, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AccessTokenProvider } from '@app/infrasctructure';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';

export class LoginRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;
}

export class LoginResponse {
  @IsNotEmpty()
  @IsString()
  access_token: string;

  constructor(props: Partial<LoginResponse>) {
    Object.assign(this, props);
  }
}

@ApiTags('Auth')
@Controller({ path: 'auth', version: ['1'] })
export class LoginController {
  constructor(
    private readonly accessTokenProvider: AccessTokenProvider,
  ) { }

  @ApiBody({
    type: LoginRequest,
    required: true,
    description: 'Login requires username and password.',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  async login(@Request() request): Promise<LoginResponse> {
    const { user } = request;
    const response = await this.accessTokenProvider.execute(user);
    Logger.debug('Login response', { response });

    if (!response) return null;

    const result = new LoginResponse({
      access_token: response
    })
    return result;
  }
}
