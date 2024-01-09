import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { SignupUseCase } from '@app/application';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupRequest {
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

@ApiTags('Auth')
@Controller({ path: 'auth', version: ['1'] })
export class SignupController {
  constructor(
    private readonly signupUseCase: SignupUseCase,
  ) { }

  @Post('signup')
  @ApiOperation({ summary: 'User Signup' })
  async signup(@Body() request: SignupRequest): Promise<void> {
    const { email, password } = request;
    await this.signupUseCase.execute(email, password);
    Logger.debug('Signup', { request });
  }
}
