import { Category } from "@/src/entities/category.entity";
import categories from "./category.data.json";

export async function seedCategories() {
  await Category.insert(categories);
}
