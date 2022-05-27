import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class ProductWhereInput {
  @Field(() => ID)
  id: string;
}
