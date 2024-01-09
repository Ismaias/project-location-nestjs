import { Controller, Delete, Logger, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeleteLocationUseCase } from '@app/application';


@ApiTags('Locations')
@Controller({ path: 'locations', version: ['1'] })
export class DeleteLocationController {
  constructor(
    private readonly deleteLocationUseCase: DeleteLocationUseCase,
  ) { }

  @Delete(':id')
  @ApiOperation({ summary: 'delete location by ID' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteLocationUseCase.execute(id);
    Logger.debug('Location deleted', { id });
  }
}
