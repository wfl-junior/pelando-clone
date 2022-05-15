import { Field, ObjectType } from "@nestjs/graphql";
import { ResolverResponse } from "../ResolverResponse";
import { PaginatedProducts } from "./PaginatedProducts";

@ObjectType()
export class ProductsQueryResponse extends ResolverResponse {
  @Field(() => PaginatedProducts, { nullable: true })
  products?: PaginatedProducts | null;
}
