import { UpdateLocationUseCase } from '@app/application';
import { LocationEntity, LocationRepository } from '@app/domain';

describe('UpdateLocationUseCase', () => {
  let updateLocationUseCase: UpdateLocationUseCase;
  let locationRepository: LocationRepository;

  beforeEach(() => {
    locationRepository = {
      getById: jest.fn(),
      update: jest.fn(),
    } as unknown as LocationRepository;

    updateLocationUseCase = new UpdateLocationUseCase(locationRepository);
  });

  it('should update an existing location', async () => {
    const id = 'existing-id';
    const name = 'Updated Location';
    const city = 'Updated City';
    const state = 'US';

    const existingLocation = new LocationEntity({
      id,
      name: 'Initial Name',
      city: 'Initial City',
      state: 'IS',
    });

    jest.spyOn(locationRepository, 'getById').mockResolvedValue(existingLocation);

    await updateLocationUseCase.execute(id, name, city, state);

    expect(locationRepository.getById).toHaveBeenCalledWith(id);
    expect(locationRepository.update).toHaveBeenCalledWith({
      ...existingLocation,
      name,
      city,
      state,
    });
  });

  it('should throw an error when updating a non-existing location', async () => {
    const id = 'non-existing-id';
    const name = 'Updated Location';
    const city = 'Updated City';
    const state = 'US';

    jest.spyOn(locationRepository, 'getById').mockResolvedValue(null);

    await expect(updateLocationUseCase.execute(id, name, city, state)).rejects.toThrow('Location not found');
    expect(locationRepository.update).not.toHaveBeenCalled();
  });

});
