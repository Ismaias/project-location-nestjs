import { Module } from '@nestjs/common';
import { LocationModel } from '@app/infrasctructure';
import { LocationModule } from '@app/infrasctructure/nest/modules/location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
          entities: [LocationModel],
          migrationsTableName: 'migrations',
          migrations: [`${__dirname}/**/migrations/*.ts`],
        };
      },
      inject: [ConfigService],
    }),
    LocationModule,
  ],
})
export class AppModule { }

