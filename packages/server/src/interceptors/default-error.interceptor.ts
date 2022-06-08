import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import { catchError, Observable } from "rxjs";

@Injectable()
export class DefaultErrorInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext & { contextType: "graphql" | "http" },
    next: CallHandler,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        const gqlContext = GqlExecutionContext.create(context);
        const gqlInfo = gqlContext.getInfo<GraphQLResolveInfo>();
        const request = context.switchToHttp().getRequest();

        console.log({
          time: new Date(),
          where: `default error interceptor for ${
            context.contextType === "graphql"
              ? `${gqlInfo.fieldName} ${gqlInfo.operation.operation}`
              : `${request.route.path} ${JSON.stringify(request.route.methods)}`
          }`,
          error,
        });

        throw new InternalServerErrorException("Houston, we have a problem");
      }),
    );
  }
}
