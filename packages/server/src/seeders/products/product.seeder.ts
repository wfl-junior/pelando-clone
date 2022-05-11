import { Product } from "@/src/entities";
import products from "./product.data.json";

export async function seedProducts() {
  await Product.insert(products);
}
