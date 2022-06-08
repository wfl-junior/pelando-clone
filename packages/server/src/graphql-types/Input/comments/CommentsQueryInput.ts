import { Field, InputType } from "@nestjs/graphql";
import { PaginatedQueryInput } from "../PaginatedQueryInput";
import { CommentsOrderByInput } from "./CommentsOrderByInput";
import { CommentsWhereInput } from "./CommentsWhereInput";

@InputType()
export class CommentsQueryInput extends PaginatedQueryInput {
  @Field(() => CommentsWhereInput)
  where: CommentsWhereInput;

  @Field(() => CommentsOrderByInput, { nullable: true })
  orderBy?: CommentsOrderByInput | null;
}
