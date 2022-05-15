import { ormconfig } from "@/ormconfig";
import { DataSource } from "typeorm";
import { seedProducts } from "./products/product.seeder";
import { seedStores } from "./stores/store.seeder";

async function seed() {
  await new DataSource(ormconfig as any).initialize();
  await seedStores();
  await seedProducts();

  process.exit(0);
}

seed();
