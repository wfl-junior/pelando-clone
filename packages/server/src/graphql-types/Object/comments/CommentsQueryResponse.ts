import { Field, ObjectType } from "@nestjs/graphql";
import { ResolverResponse } from "../ResolverResponse";
import { PaginatedComments } from "./PaginatedComments";

@ObjectType()
export class CommentsQueryResponse extends ResolverResponse {
  @Field(() => PaginatedComments, { nullable: true })
  comments?: PaginatedComments | null;
}
