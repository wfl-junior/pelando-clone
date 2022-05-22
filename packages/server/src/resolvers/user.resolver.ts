import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import bcrypt from "bcrypt";
import { QueryFailedError } from "typeorm";
import { ValidationError } from "yup";
import { IContext, IContextWithUser, IResolverResponse } from "../@types/app";
import { UNIQUE_EMAIL_INDEX, UNIQUE_USERNAME_INDEX } from "../constants";
import { User } from "../entities";
import { LoginInput } from "../graphql-types/Input/LoginInput";
import { RegisterInput } from "../graphql-types/Input/RegisterInput";
import { FieldError } from "../graphql-types/Object/FieldError";
import { ResolverResponse } from "../graphql-types/Object/ResolverResponse";
import { LoginResponse } from "../graphql-types/Object/users/LoginResponse";
import { MeResponse } from "../graphql-types/Object/users/MeResponse";
import { RegisterResponse } from "../graphql-types/Object/users/RegisterResponse";
import { AuthGuard } from "../guards/auth.guard";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";
import { getRandomNumberBetween } from "../utils/getRandomNumberBetween";
import { createAccessToken, sendRefreshToken } from "../utils/jwt";
import { yupErrorResponse } from "../utils/yupErrorResponse";
import { loginValidationSchema } from "../yup/loginValidationSchema";
import { registerValidationSchema } from "../yup/registerValidationSchema";

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => RegisterResponse)
  async register(
    @Args("input", { type: () => RegisterInput }) input: RegisterInput,
    @Context() { response }: IContext,
  ): Promise<IResolverResponse<RegisterResponse>> {
    try {
      await registerValidationSchema.validate(input, {
        abortEarly: false,
        strict: true,
      });

      const user = await User.create({
        ...input,
        offerVoteValue: getRandomNumberBetween(6, 7),
      }).save();

      sendRefreshToken(response, user);

      return {
        ok: true,
        accessToken: createAccessToken(user),
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        return yupErrorResponse(error);
      }

      if (error instanceof QueryFailedError) {
        const match = error.message.match(
          new RegExp(`${UNIQUE_EMAIL_INDEX}|${UNIQUE_USERNAME_INDEX}`),
        );

        if (match) {
          const path = match[0].split("_").pop();

          return {
            ok: false,
            errors: [
              {
                path,
                message: `${path} already registered`,
              },
            ],
          };
        }
      }

      console.log({ time: new Date(), where: "mutation register", error });
      return defaultErrorResponse();
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args("input", { type: () => LoginInput })
    { password, ...input }: LoginInput,
    @Context() { response }: IContext,
  ): Promise<IResolverResponse<LoginResponse>> {
    try {
      await loginValidationSchema.validate(
        { ...input, password },
        {
          abortEarly: false,
          strict: true,
        },
      );

      const user = await User.findOne({
        where: input as any, //! ts não gosta do null, mas TypeORM converte null para undefined
        select: ["id", "email", "username", "password"],
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        sendRefreshToken(response, user);

        return {
          ok: true,
          accessToken: createAccessToken(user),
        };
      }

      const errorMessage = "Credenciais inválidas";

      return {
        ok: false,
        errors: Object.entries({ ...input, password }).reduce<FieldError[]>(
          (errors, [key, value]) => {
            if (value) {
              errors.push({ path: key, message: errorMessage });
            }

            return errors;
          },
          [],
        ),
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        return yupErrorResponse(error);
      }

      console.log({ time: new Date(), where: "mutation login", error });
      return defaultErrorResponse();
    }
  }

  @Mutation(() => ResolverResponse)
  logout(
    @Context() { response }: IContext,
  ): IResolverResponse<ResolverResponse> {
    try {
      response.clearCookie(process.env.COOKIE_NAME);
      return { ok: true };
    } catch (error) {
      console.log({ time: new Date(), where: "mutation logout", error });
      return defaultErrorResponse();
    }
  }

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
