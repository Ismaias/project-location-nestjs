import { DeleteLocationUseCase } from '@app/application';
import { LocationEntity, LocationRepository } from '@app/domain';
import { NotFoundException } from '@nestjs/common';

describe('DeleteLocationUseCase', () => {
  let deleteLocationUseCase: DeleteLocationUseCase;
  let locationRepository: LocationRepository;

  beforeEach(() => {
    locationRepository = {
      getById: jest.fn(),
      delete: jest.fn(),
    } as unknown as LocationRepository;

    deleteLocationUseCase = new DeleteLocationUseCase(locationRepository);
  });

  it('should delete an existing location', async () => {
    const id = 'existing-id';
    const existingLocation = new LocationEntity({ id, name: 'Test Location' });

    jest.spyOn(locationRepository, 'getById').mockResolvedValue(existingLocation);

    await deleteLocationUseCase.execute(id);

    expect(locationRepository.getById).toHaveBeenCalledWith(id);
    expect(locationRepository.delete).toHaveBeenCalledWith(existingLocation);
  });

  it('should handle location not found error', async () => {
    const id = 'non-existing-id';

    jest.spyOn(locationRepository, 'getById').mockResolvedValue(null);

    await expect(deleteLocationUseCase.execute(id)).rejects.toThrow(NotFoundException);
  });

});
