import { LocationEntity, LocationRepository } from "@app/domain";
import { Inject, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class CreateLocationUseCase {
  constructor(
    @Inject('LocationRepository')
    private readonly locationRepository: LocationRepository,
  ) { }

  async execute(name: string, city: string, state: string): Promise<void> {
    const location = new LocationEntity({
      name,
      city,
      state,
    });

    await this.locationRepository.create(location);

    Logger.debug('Location created.', { location });
  }
}
