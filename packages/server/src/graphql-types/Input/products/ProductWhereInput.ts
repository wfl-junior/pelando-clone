import { Field, InputType } from "@nestjs/graphql";
import { CategoryWhereInput } from "../categories/CategoryWhereInput";

@InputType()
export class ProductWhereInput {
  @Field(() => CategoryWhereInput, { nullable: true })
  category?: CategoryWhereInput | null;

  @Field(() => [String], { nullable: true })
  ids?: string[] | null;
}
