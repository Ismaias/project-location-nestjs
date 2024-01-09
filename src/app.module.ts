import { Module } from '@nestjs/common';
import { LocationModel, UserModel } from '@app/infrasctructure';
import { LocationModule } from '@app/infrasctructure/nest/modules/location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@app/infrasctructure/nest/modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const url = configService.get<string>('LOCATION_API_CONNECTION_STRING');

        return {
          type: 'postgres',
          url,
          entities: [LocationModel, UserModel],
          migrationsTableName: 'migrations',
          migrations: [`${__dirname}/**/migrations/*.ts`],
        };
      },
      inject: [ConfigService],
    }),
    LocationModule,
    AuthModule,
  ],
})
export class AppModule { }

