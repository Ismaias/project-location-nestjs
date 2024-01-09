import { CreateLocationUseCase, UpdateLocationUseCase } from "@app/application";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationModel, LocationDatabaseRepository, CreateLocationController } from "@app/infrasctructure";
import { UpdateLocationController } from "../controllers/update-location.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationModel]),
  ],
  controllers: [CreateLocationController, UpdateLocationController],
  providers: [
    CreateLocationUseCase,
    UpdateLocationUseCase,
    {
      provide: 'LocationRepository',
      useClass: LocationDatabaseRepository,
    }
  ],
})
export class LocationModule { }
