import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import path from "path";

export const ormconfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "test",
  entities: [path.join(__dirname, "src", "entities", "*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "src", "migrations", "*{.ts,.js}")],
  synchronize: false,
  logging: false,
  debug: false,
};
