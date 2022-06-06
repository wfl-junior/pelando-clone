import { Comment } from "@/src/entities";
import { Field, ObjectType } from "@nestjs/graphql";
import { ResolverResponse } from "../ResolverResponse";

@ObjectType()
export class CommentResponse extends ResolverResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment | null;
}
