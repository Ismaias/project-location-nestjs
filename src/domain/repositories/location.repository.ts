import { Location } from "@app/domain";

export interface LocationRepository {
  create(locationData: Partial<Location>): Promise<Location>;

  delete(locationData: Location): Promise<void>;

  update(location: Partial<Location>): Promise<Location>;

  getById(id: string): Promise<Location | null>;

  getAll(): Promise<Location[] | null>;

  getByName(name: string): Promise<Location[]>;
}
