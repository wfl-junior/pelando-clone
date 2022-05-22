import { Product } from "@/src/entities";
import { Field, ObjectType } from "@nestjs/graphql";
import { ResolverResponse } from "../ResolverResponse";

@ObjectType()
export class ProductQueryResponse extends ResolverResponse {
  @Field(() => Product, { nullable: true })
  product?: Product | null;
}
