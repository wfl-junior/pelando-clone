import { Store } from "@/src/entities";
import stores from "./store.data.json";

export async function seedStores() {
  await Store.insert(stores);
}
