import { Field, InputType } from "@nestjs/graphql";
import { UserProductVoteType } from "../../enums/UserProductVoteType";
import { RemoveVoteFromProductInput } from "./RemoveVoteFromProductInput";

@InputType()
export class VoteOnProductInput extends RemoveVoteFromProductInput {
  @Field(() => UserProductVoteType)
  type: UserProductVoteType;
}
