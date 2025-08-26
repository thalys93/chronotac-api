import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Game } from './entities/Game';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'chronotac',
  password: process.env.DB_PASSWORD || 'chronotac123',
  database: process.env.DB_DATABASE || 'tictac',
  synchronize: false,
  logging: false,
  entities: [Game],
  migrations: ['src/database/migrations/*.ts'], 
  subscribers: [],
  migrationsTableName: 'migrations_history',
});