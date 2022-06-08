import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";
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
        const request = context.switchToHttp().getRequest<Request>();

        console.log({
          time: new Date(),
          where: `default error interceptor for ${
            context.contextType === "graphql"
              ? `graphql ${gqlInfo.fieldName} ${gqlInfo.operation.operation}`
              : `${request.method} ${request.url}`
          }`,
          error,
        });

        throw new InternalServerErrorException("Houston, we have a problem");
      }),
    );
  }
}
