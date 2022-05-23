import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: true })
  email?: string | null;

  @Field(() => String, { nullable: true })
  username?: string | null;

  @Field()
  password: string;
}
