import { Location, LocationRepository } from "@app/domain";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class GetAllLocationUseCase {
  constructor(
    @Inject('LocationRepository')
    private readonly locationRepository: LocationRepository,
  ) { }

  async execute(name: string): Promise<Location[]> {
    if (name) return this.locationRepository.getByName(name);
    return this.locationRepository.getAll();
  }
}
