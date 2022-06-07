import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable, of } from "rxjs";
import { SchemaOf, ValidationError } from "yup";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";
import { yupErrorResponse } from "../utils/yupErrorResponse";

type YupSchema = SchemaOf<any>;

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  constructor(
    private schema: YupSchema,
    private argsPropertyToValidate = "input",
  ) {}

  async intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const context = GqlExecutionContext.create(ctx);

    try {
      const args = context.getArgs<Record<string, any>>();

      await this.schema.validate(args[this.argsPropertyToValidate], {
        abortEarly: false,
        strict: true,
      });

      return next.handle();
    } catch (error) {
      if (error instanceof ValidationError) {
        return of(yupErrorResponse(error));
      }

      console.log({
        time: new Date(),
        where: `validation interceptor for ${context.getInfo().fieldName}`,
        error,
      });

      return of(defaultErrorResponse());
    }
  }
}

export function UseValidation(
  schema: YupSchema,
  argsPropertyToValidate?: string,
) {
  return UseInterceptors(
    new ValidationInterceptor(schema, argsPropertyToValidate),
  );
}
