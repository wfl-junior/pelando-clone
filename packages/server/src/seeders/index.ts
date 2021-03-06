import { ormconfig } from "@/ormconfig";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { seedCategories } from "./categories/category.seeder";
import { seedProducts } from "./products/product.seeder";
import { seedStores } from "./stores/store.seeder";

async function seed() {
  const options = { ...ormconfig } as DataSourceOptions;

  if (ormconfig.type === "sqlite" && process.env.NODE_ENV !== "test") {
    Object.assign(options, {
      // se for sqlite tem que pegar o database de dist
      // exceto para tests, para tests deve usar o normal
      database: path.join(__dirname, "..", "..", "dist", "database.sqlite"),
    });
  }

  await new DataSource(options).initialize();

  await Promise.all([seedStores(), seedCategories()]);
  await seedProducts();

  process.exit(0);
}

seed();
