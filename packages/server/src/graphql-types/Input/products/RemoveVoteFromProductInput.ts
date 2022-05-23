import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RemoveVoteFromProductInput {
  @Field()
  productId: string;
}
