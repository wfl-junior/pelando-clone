import { Field, ObjectType } from "@nestjs/graphql";
import { ResolverResponse } from "../ResolverResponse";
import { PaginatedStores } from "./PaginatedProducts";

@ObjectType()
export class StoresQueryResponse extends ResolverResponse {
  @Field(() => PaginatedStores, { nullable: true })
  stores?: PaginatedStores | null;
}
