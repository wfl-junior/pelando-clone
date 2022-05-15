import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PageInfo {
  @Field(() => Int)
  perPage: number;

  @Field(() => Int)
  from: number;

  @Field(() => Int)
  to: number;

  @Field(() => Int)
  total: number;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;
}
