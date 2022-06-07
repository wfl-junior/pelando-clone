import { Context, Query, Resolver } from "@nestjs/graphql";
import { IContextWithUser, IResolverResponse } from "../@types/app";
import { User } from "../entities";
import { MeResponse } from "../graphql-types/Object/users/MeResponse";
import { UseAuthGuard } from "../guards/auth.guard";

@Resolver(() => User)
export class UserResolver {
  @Query(() => MeResponse)
  @UseAuthGuard()
  async me(
    @Context() { user }: IContextWithUser,
  ): Promise<IResolverResponse<MeResponse>> {
    return {
      ok: true,
      user,
    };
  }
}
