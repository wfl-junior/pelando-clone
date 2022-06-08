import { Comment } from "@/src/entities";
import { ObjectType } from "@nestjs/graphql";
import { BasePaginatedData } from "../BasePaginatedData";

@ObjectType()
export class PaginatedComments extends BasePaginatedData(Comment) {}
