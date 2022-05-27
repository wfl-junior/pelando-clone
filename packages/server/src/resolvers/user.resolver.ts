import { UseGuards } from "@nestjs/common";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { IContextWithUser, IResolverResponse } from "../@types/app";
import { User } from "../entities";
import { MeResponse } from "../graphql-types/Object/users/MeResponse";
import { AuthGuard } from "../guards/auth.guard";

@Resolver(() => User)
export class UserResolver {
  @Query(() => MeResponse)
  @UseGuards(new AuthGuard())
  async me(
    @Context() { user }: IContextWithUser,
  ): Promise<IResolverResponse<MeResponse>> {
    return {
      ok: true,
      user,
    };
  }
}
