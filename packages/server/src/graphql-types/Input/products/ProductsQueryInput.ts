import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ProductsQueryInput {
  @Field(() => Int, { nullable: true })
  offset?: number | null;

  @Field(() => Int, { nullable: true })
  perPage?: number | null;
}
