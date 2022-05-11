import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const ormconfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "test",
  entities: ["./src/entities/*.(t|j)s"],
  migrations: ["./src/migrations/*.(t|j)s"],
  synchronize: false,
  logging: false,
  debug: false,
};
