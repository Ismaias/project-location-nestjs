import { CreateLocationUseCase } from '@app/application';
import { LocationRepository } from '@app/domain';

describe('CreateLocationUseCase', () => {
  let createLocationUseCase: CreateLocationUseCase;
  let locationRepository: LocationRepository;

  beforeEach(() => {
    locationRepository = {
      create: jest.fn(),
    } as unknown as LocationRepository;

    createLocationUseCase = new CreateLocationUseCase(locationRepository);
  });

  it('should create a new location', async () => {
    const name = 'Test Location';
    const city = 'Test City';
    const state = 'TS';

    await createLocationUseCase.execute(name, city, state);

    expect(locationRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name,
        city,
        state,
      }),
    );
  });

  it('should handle errors during location creation', async () => {
    const name = 'Invalid Location';
    const city = 'Invalid City';
    const state = 'IS';

    jest.spyOn(locationRepository, 'create').mockRejectedValueOnce(() => {
      throw new Error('Database error');
    });

    await expect(createLocationUseCase.execute(name, city, state)).rejects.toThrow('Database error');
  });

});
