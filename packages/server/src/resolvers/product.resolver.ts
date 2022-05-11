import { Query, Resolver } from "@nestjs/graphql";
import { Product } from "../entities";

@Resolver(() => Product)
export class ProductResolver {
  @Query(() => [Product])
  products(): Promise<Product[]> {
    return Product.find();
  }
}
