import { Product } from "@/src/entities";
import { Category } from "@/src/entities/category.entity";
import { Store } from "@/src/entities/store.entity";
import products from "./product.data.json";

export async function seedProducts() {
  const stores = await Store.find();
  const categories = await Category.find();

  await Product.insert(
    products.map(({ store, category, ...product }) => ({
      ...product,
      storeId: stores.find(s => s.slug === store.slug)!.id,
      categoryId: categories.find(c => c.slug === category.slug)!.id,
    })),
  );
}
