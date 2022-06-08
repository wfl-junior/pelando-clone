import { Field, InputType } from "@nestjs/graphql";
import { OrderByDirection } from "../../enums/OrderByDirection";

@InputType()
export class CommentsOrderByInput {
  @Field(() => OrderByDirection, { nullable: true })
  id?: OrderByDirection | null;

  @Field(() => OrderByDirection, { nullable: true })
  createdAt?: OrderByDirection | null;

  @Field(() => OrderByDirection, { nullable: true })
  body?: OrderByDirection | null;
}
