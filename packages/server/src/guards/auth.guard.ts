import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { IContext } from "../@types/app";
import { getUserFromRequest } from "../utils/getUserFromRequest";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    try {
      const context = GqlExecutionContext.create(ctx).getContext<IContext>();
      const user = await getUserFromRequest(context.request);

      if (user) {
        context.user = user;
        return true;
      }
    } catch {}

    throw new UnauthorizedException();
  }
}
