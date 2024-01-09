import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel, UserDatabaseRepository, SignupController } from "@app/infrasctructure";
import { SignupUseCase } from "@app/application";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [SignupController],
  providers: [
    SignupUseCase,
    {
      provide: 'UserRepository',
      useClass: UserDatabaseRepository,
    }
  ],
})
export class AuthModule { }
