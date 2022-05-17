import { Field, InputType } from "@nestjs/graphql";
import { PaginatedQueryInput } from "./PaginatedQueryInput";
import { ProductWhereInput } from "./ProductWhereInput";

@InputType()
export class ProductsQueryInput extends PaginatedQueryInput {
  @Field(() => ProductWhereInput, { nullable: true })
  where?: ProductWhereInput | null;
}
