import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CategoryWhereInput {
  @Field(() => String, { nullable: true })
  slug?: string | null;
}
