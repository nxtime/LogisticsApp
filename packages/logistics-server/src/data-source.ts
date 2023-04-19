import { DataSource } from 'typeorm';
import { User } from './entities/user.entities';

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "./src/database/database.sqlite",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [
    "./src/migrations/**/*.migration.ts",
  ],
  subscribers: [
    "./src/subscribers/**/*.subscriber.ts",
  ]
})
