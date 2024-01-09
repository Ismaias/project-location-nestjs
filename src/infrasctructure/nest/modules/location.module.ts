import { CreateLocationUseCase, DeleteLocationUseCase, GetAllLocationUseCase, GetByIdLocationUseCase, UpdateLocationUseCase } from "@app/application";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationModel, LocationDatabaseRepository, CreateLocationController, UpdateLocationController, DeleteLocationController, GetByIdLocationController, GetAllLocationController } from "@app/infrasctructure";

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationModel]),
  ],
  controllers: [CreateLocationController, UpdateLocationController, DeleteLocationController, GetByIdLocationController, GetAllLocationController],
  providers: [
    CreateLocationUseCase,
    UpdateLocationUseCase,
    DeleteLocationUseCase,
    GetByIdLocationUseCase,
    GetAllLocationUseCase,
    {
      provide: 'LocationRepository',
      useClass: LocationDatabaseRepository,
    }
  ],
})
export class LocationModule { }
