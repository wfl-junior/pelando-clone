import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FieldError {
  @Field(() => String, { nullable: true })
  path?: string | null;

  @Field()
  message: string;
}
