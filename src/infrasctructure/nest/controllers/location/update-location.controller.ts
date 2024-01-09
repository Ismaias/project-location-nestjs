import { Controller, Post, Body, Put, Param, Logger } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { UpdateLocationUseCase } from '@app/application';
import { IsString, Length } from 'class-validator';

export class UpdateLocationRequest {
  @IsString()
  @ApiProperty({
    example: 'Central Park Updated',
    description: 'The updated name of the location',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'New York City Updated',
    description: 'The updated city of the location',
  })
  city: string;

  @IsString()
  @Length(2, 2, { message: 'State abbreviation must be 2 characters long' })
  @ApiProperty({
    example: 'NY',
    description: 'The updated state abbreviation of the location',
  })
  state: string;
}

@ApiTags('Locations')
@Controller({ path: 'locations', version: ['1'] })
export class UpdateLocationController {
  constructor(
    private readonly updateLocationUseCase: UpdateLocationUseCase,
  ) { }

  @Put(':id')
  @ApiOperation({ summary: 'update location by ID' })
  @ApiCreatedResponse({ description: 'updated' })
  async update(@Param('id') id: string, @Body() request: UpdateLocationRequest): Promise<void> {
    const { name, city, state } = request;
    await this.updateLocationUseCase.execute(id, name, city, state);
    Logger.debug('Location updated', { request });
  }
}
