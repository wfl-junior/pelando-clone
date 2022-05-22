import { Field, ObjectType } from "@nestjs/graphql";
import { FieldError } from "./FieldError";

@ObjectType()
export class ResolverResponse {
  @Field()
  ok: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[] | null;
}
