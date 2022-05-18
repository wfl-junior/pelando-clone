import { Field, ObjectType } from "@nestjs/graphql";
import { ResolverResponse } from "../ResolverResponse";

@ObjectType()
export class LoginResponse extends ResolverResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string | null;
}
