import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Game } from './entities/Game';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'chronotac',
  synchronize: false,
  logging: false,
  entities: [Game],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
  migrationsTableName: 'migrations_history',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});