import { User } from "@/src/entities";
import { Field, ObjectType } from "@nestjs/graphql";
import { ResolverResponse } from "../ResolverResponse";

@ObjectType()
export class MeResponse extends ResolverResponse {
  @Field(() => User, { nullable: true })
  user?: User | null;
}
