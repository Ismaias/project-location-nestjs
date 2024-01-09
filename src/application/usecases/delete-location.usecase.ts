import { LocationRepository } from "@app/domain";
import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteLocationUseCase {
  constructor(
    @Inject('LocationRepository')
    private readonly locationRepository: LocationRepository,
  ) { }

  async execute(id: string): Promise<void> {
    const existingLocation = await this.locationRepository.getById(id);

    if (!existingLocation) {
      throw new NotFoundException('Location not found');
    }

    await this.locationRepository.delete(existingLocation);

    Logger.debug('Location deleted.', { id });
  }
}
