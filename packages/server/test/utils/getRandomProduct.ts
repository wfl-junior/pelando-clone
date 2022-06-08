import { Product } from "@/src/entities";

export function getRandomProduct() {
  return Product.createQueryBuilder("product")
    .innerJoinAndSelect("product.store", "store")
    .innerJoinAndSelect("product.category", "category")
    .select([
      "product.id",
      "product.createdAt",
      "product.body",
      "product.couponCode",
      "product.price",
      "product.sourceUrl",
      "product.title",
      "product.image",
      "product.temperature",
      "store.id",
      "store.createdAt",
      "store.slug",
      "store.name",
      "store.url",
      "store.image",
      "category.id",
      "category.createdAt",
      "category.slug",
      "category.title",
    ])
    .orderBy("RANDOM()", Math.random() > 0.5 ? "ASC" : "DESC")
    .getOneOrFail();
}
