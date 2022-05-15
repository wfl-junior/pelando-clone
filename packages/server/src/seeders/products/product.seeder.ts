import { Product } from "@/src/entities";
import { Store } from "@/src/entities/store.entity";
import products from "./product.data.json";

export async function seedProducts() {
  const stores = await Store.find();

  await Product.insert(
    products.map(({ store, ...product }) => ({
      ...product,
      storeId: stores.find(s => s.slug === store.slug)!.id,
    })),
  );
}
