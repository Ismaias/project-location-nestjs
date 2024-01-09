import { GetAllLocationUseCase } from '@app/application';
import { Location, LocationRepository } from '@app/domain';

describe('GetAllLocationUseCase', () => {
  let getAllLocationUseCase: GetAllLocationUseCase;
  let locationRepository: LocationRepository;

  beforeEach(() => {
    locationRepository = {
      getByName: jest.fn(),
      getAll: jest.fn(),
    } as unknown as LocationRepository;

    getAllLocationUseCase = new GetAllLocationUseCase(locationRepository);
  });

  it('should get all locations when name is not provided', async () => {
    await getAllLocationUseCase.execute('');

    expect(locationRepository.getAll).toHaveBeenCalled();
    expect(locationRepository.getByName).not.toHaveBeenCalled();
  });

  it('should get locations by name when name is provided', async () => {
    const name = 'Test Location';
    await getAllLocationUseCase.execute(name);

    expect(locationRepository.getByName).toHaveBeenCalledWith(name);
    expect(locationRepository.getAll).not.toHaveBeenCalled();
  });

});
