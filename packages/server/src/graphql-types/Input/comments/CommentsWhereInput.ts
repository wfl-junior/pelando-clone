import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CommentsWhereInput {
  @Field()
  productId: string;
}
