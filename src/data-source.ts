import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  synchronize: false,
});