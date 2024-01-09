import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';


dotenv.config();

export const config = new DataSource({
  type: 'postgres',
  url: process.env.LOCATION_API_CONNECTION_STRING,
  entities: ['dist/**/*.model.js'],
  migrationsTableName: 'migrations',
  migrations: [`${__dirname}/**/infrasctructure/migrations/*.ts`],
  synchronize: true,
});
