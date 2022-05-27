import { Field, InputType } from "@nestjs/graphql";
import { ProductWhereInput } from "./ProductWhereInput";

@InputType()
export class ProductQueryInput {
  @Field(() => ProductWhereInput)
  where: ProductWhereInput;
}
