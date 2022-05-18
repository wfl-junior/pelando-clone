import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { IContext } from "../@types/app";
import { User } from "../entities/user.entity";
import { getTokenPayload } from "../utils/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    try {
      const context = GqlExecutionContext.create(ctx).getContext<IContext>();

      const { authorization } = context.request.headers;

      if (authorization) {
        const token = authorization.replace("Bearer ", "");

        const { id } = getTokenPayload(token);

        const user = await User.findOne({ where: { id } });

        if (user) {
          context.user = user;
          return true;
        }
      }

      throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
  }
}
