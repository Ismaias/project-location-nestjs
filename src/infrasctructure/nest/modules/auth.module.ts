import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { Module } from "@nestjs/common";
import { LoginController, AccessTokenProvider, LocalStrategy, SignupController, UserDatabaseRepository, UserModel } from "@app/infrasctructure";
import { LoginUseCase, SignupUseCase } from "@app/application";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    })],
  providers: [
    LoginUseCase,
    SignupUseCase,
    AccessTokenProvider,
    LocalStrategy,
    {
      provide: 'UserRepository',
      useClass: UserDatabaseRepository,
    },
  ],
  controllers: [SignupController, LoginController],
})
export class AuthModule { }
