import { Field, InputType } from "@nestjs/graphql";
import { CategoryWhereInput } from "./CategoryWhereInput";

@InputType()
export class ProductWhereInput {
  @Field(() => CategoryWhereInput, { nullable: true })
  category?: CategoryWhereInput | null;
}
