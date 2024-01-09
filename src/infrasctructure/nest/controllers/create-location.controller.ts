import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { CreateLocationUseCase } from '@app/application';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLocationRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Central Park',
    description: 'The name of the location',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'New York City',
    description: 'The city of the location',
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2, { message: 'State abbreviation must be 2 characters long' })
  @ApiProperty({
    example: 'NY',
    description: 'The state abbreviation of the location',
  })
  state: string;
}

@ApiTags('location')
@Controller({ path: 'location', version: ['1'] })
export class CreateLocationController {
  constructor(
    private readonly createLocationUseCase: CreateLocationUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'create location' })
  @ApiCreatedResponse({ description: 'created' })
  async create(@Body() request: CreateLocationRequest): Promise<void> {
    const { name, city, state } = request;
    return this.createLocationUseCase.execute(name, city, state);
  }
}
