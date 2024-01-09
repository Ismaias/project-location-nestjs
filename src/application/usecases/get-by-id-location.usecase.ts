import { Location, LocationRepository } from "@app/domain";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class GetByIdLocationUseCase {
  constructor(
    @Inject('LocationRepository')
    private readonly locationRepository: LocationRepository,
  ) { }

  async execute(id: string): Promise<Location> {
    const location = await this.locationRepository.getById(id);

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return location;
  }
}
