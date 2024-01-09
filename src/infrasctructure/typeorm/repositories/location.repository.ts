import { Location, LocationRepository } from "@app/domain";
import { Injectable } from "@nestjs/common";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LocationModel } from "@app/infrasctructure";

@Injectable()
export class LocationDatabaseRepository implements LocationRepository {
  constructor(
    @InjectRepository(LocationModel)
    private readonly locationRepository: Repository<LocationModel>,
  ) { }

  create(locationData: Partial<Location>): Promise<Location> {
    const location = this.locationRepository.create(locationData)
    return this.locationRepository.save(location);
  }

  async delete(locationData: Location): Promise<void> {
    const deleteResult = await this.locationRepository.delete(locationData.id);

    if (deleteResult.affected === 0) {
      throw new Error('Location not found or already deleted');
    }
  }

  getById(id: string): Promise<Location | undefined> {
    return this.locationRepository.findOneBy({ id });
  }

  getAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async update(location: Partial<Location>): Promise<Location | undefined> {
    const existingLocation = await this.locationRepository.findOneBy({ id: location.id });

    if (!existingLocation) {
      throw new Error('Location not found');
    }

    // Update only the provided fields
    Object.assign(existingLocation, location);

    return this.locationRepository.save(existingLocation);
  }

  getByName(name: string): Promise<Location[]> {
    return this.locationRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

}
