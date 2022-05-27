import { Field, InputType } from "@nestjs/graphql";
import { PaginatedQueryInput } from "../PaginatedQueryInput";
import { ProductsOrderByInput } from "./ProductsOrderByInput";
import { ProductsWhereInput } from "./ProductsWhereInput";

@InputType()
export class ProductsQueryInput extends PaginatedQueryInput {
  @Field(() => ProductsWhereInput, { nullable: true })
  where?: ProductsWhereInput | null;

  @Field(() => ProductsOrderByInput, { nullable: true })
  orderBy?: ProductsOrderByInput | null;
}
