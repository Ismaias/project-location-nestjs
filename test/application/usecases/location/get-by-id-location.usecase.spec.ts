import { GetByIdLocationUseCase } from '@app/application';
import { Location, LocationEntity, LocationRepository } from '@app/domain';
import { NotFoundException } from '@nestjs/common';

describe('GetByIdLocationUseCase', () => {
  let getByIdLocationUseCase: GetByIdLocationUseCase;
  let locationRepository: LocationRepository;

  beforeEach(() => {
    locationRepository = {
      getById: jest.fn(),
    } as unknown as LocationRepository;

    getByIdLocationUseCase = new GetByIdLocationUseCase(locationRepository);
  });

  it('should get location by ID', async () => {
    const id = 'existing-id';
    const existingLocation = new LocationEntity({ id, name: 'Test Location' });

    jest.spyOn(locationRepository, 'getById').mockResolvedValue(existingLocation);

    const result = await getByIdLocationUseCase.execute(id);

    expect(locationRepository.getById).toHaveBeenCalledWith(id);
    expect(result).toEqual(existingLocation);
  });

  it('should throw NotFoundException for non-existing location', async () => {
    const id = 'non-existing-id';

    jest.spyOn(locationRepository, 'getById').mockResolvedValue(null);

    await expect(getByIdLocationUseCase.execute(id)).rejects.toThrow(NotFoundException);
  });

});
