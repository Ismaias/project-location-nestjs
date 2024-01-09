import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetAllLocationUseCase } from '@app/application';
import { Location } from '@app/domain';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class GetAllLocationResponse {
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

  constructor(props: Partial<GetAllLocationResponse>) {
    Object.assign(this, props);
  }
}

@ApiTags('Locations')
@Controller({ path: 'locations', version: ['1'] })
export class GetAllLocationController {
  constructor(
    private readonly getAllLocationUseCase: GetAllLocationUseCase,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiQuery({ name: 'name', description: 'Location name', required: false })
  async getAll(@Query('name') name?: string): Promise<GetAllLocationResponse[]> {
    const response = await this.getAllLocationUseCase.execute(name);
    Logger.debug('Get all location response', { response });

    if (!response) return null;

    const result = response.map(item => (new GetAllLocationResponse({
      id: item.id,
      name: item.name,
      city: item.city,
      state: item.state,
    })));

    return result;
  }

}
