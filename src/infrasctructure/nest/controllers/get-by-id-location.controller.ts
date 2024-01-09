import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { GetByIdLocationUseCase } from '@app/application';
import { Location } from '@app/domain';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class GetByIdLocationResponse {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2, { message: 'State abbreviation must be 2 characters long' })
  state: string;

  constructor(props: Partial<GetByIdLocationResponse>) {
    Object.assign(this, props);
  }
}

@ApiTags('Locations')
@Controller({ path: 'locations', version: ['1'] })
export class GetByIdLocationController {
  constructor(
    private readonly getByIdLocationUseCase: GetByIdLocationUseCase,
  ) { }

  @Get(':id')
  @ApiOperation({ summary: 'Get location by ID' })
  @ApiParam({ name: 'id', description: 'Location ID' })
  async getById(@Param('id') id: string): Promise<GetByIdLocationResponse> {
    const response = await this.getByIdLocationUseCase.execute(id);
    Logger.debug('Get by id location response', { response });

    if(!response) return null;

    const result = new GetByIdLocationResponse({
      id: response.id,
      name: response.name,
      city: response.city,
      state: response.state,
    });

    return result;
  }

}
