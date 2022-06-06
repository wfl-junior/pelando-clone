import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddCommentInput {
  @Field()
  productId: string;

  @Field()
  body: string;
}
