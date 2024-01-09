import { LocationEntity, LocationRepository } from "@app/domain";
import { Inject, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UpdateLocationUseCase {
  constructor(
    @Inject('LocationRepository')
    private readonly locationRepository: LocationRepository,
  ) { }

  async execute(id: string, name: string, city: string, state: string): Promise<void> {
    const location = await this.locationRepository.getById(id);

    if (!location) {
      Logger.debug('Location not found.', { id });
      throw new Error('Location not found');
    }

    location.name = name;
    location.city = city;
    location.state = state;

    await this.locationRepository.update(location);

    Logger.debug('Location updated.', { location: location });
  }
}
