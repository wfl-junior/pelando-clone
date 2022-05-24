import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import path from "path";

export const ormconfig: TypeOrmModuleOptions = {
  type: "sqlite",
  database: path.join(__dirname, "database.sqlite"),
  entities: [path.join(__dirname, "src", "entities", "*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "src", "migrations", "*{.ts,.js}")],
  synchronize: true,
  logging: false,
};
