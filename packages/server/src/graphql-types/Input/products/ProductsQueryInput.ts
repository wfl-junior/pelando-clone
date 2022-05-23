import { Field, InputType } from "@nestjs/graphql";
import { PaginatedQueryInput } from "../PaginatedQueryInput";
import { ProductOrderByInput } from "./ProductOrderByInput";
import { ProductWhereInput } from "./ProductWhereInput";

@InputType()
export class ProductsQueryInput extends PaginatedQueryInput {
  @Field(() => ProductWhereInput, { nullable: true })
  where?: ProductWhereInput | null;

  @Field(() => ProductOrderByInput, { nullable: true })
  orderBy?: ProductOrderByInput | null;
}
