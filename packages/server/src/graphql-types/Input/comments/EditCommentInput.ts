import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class EditCommentInput {
  @Field(() => ID)
  id: string;

  @Field()
  body: string;
}
