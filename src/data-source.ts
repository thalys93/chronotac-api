import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Game } from './entities/Game';
import * as dotenv from 'dotenv';

dotenv.config();

let config: any = {
  type: 'postgres',
  synchronize: false,
  logging: false,
  entities: [Game],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
  migrationsTableName: 'migrations_history',
};

if (process.env.DATABASE_URL) {
  config.url = process.env.DATABASE_URL;
  config.ssl = { rejectUnauthorized: false };
} else {
  config = {
    ...config,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'chronotac',
  };
}

export const AppDataSource = new DataSource(config);