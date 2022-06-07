import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import axios from "axios";
import bcrypt from "bcrypt";
import { IsNull, QueryFailedError } from "typeorm";
import {
  GoogleOAuthResponse,
  IContext,
  IResolverResponse,
} from "../@types/app";
import { UNIQUE_EMAIL_INDEX, UNIQUE_USERNAME_INDEX } from "../constants";
import { User } from "../entities";
import { LoginInput } from "../graphql-types/Input/users/LoginInput";
import { RegisterInput } from "../graphql-types/Input/users/RegisterInput";
import { FieldError } from "../graphql-types/Object/FieldError";
import { ResolverResponse } from "../graphql-types/Object/ResolverResponse";
import { LoginResponse } from "../graphql-types/Object/users/LoginResponse";
import { RegisterResponse } from "../graphql-types/Object/users/RegisterResponse";
import { UseValidation } from "../interceptors/validation.interceptor";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";
import { getShortCode } from "../utils/getShortCode";
import { createAccessToken, sendRefreshToken } from "../utils/jwt";
import { removeNullPropertiesDeep } from "../utils/removeNullPropertiesDeep";
import { loginValidationSchema } from "../yup/loginValidationSchema";
import { registerValidationSchema } from "../yup/registerValidationSchema";

@Resolver(() => User)
export class AuthResolver {
  @Mutation(() => RegisterResponse)
  @UseValidation(registerValidationSchema)
  async register(
    @Args("input", { type: () => RegisterInput }) input: RegisterInput,
    @Context() { response }: IContext,
  ): Promise<IResolverResponse<RegisterResponse>> {
    try {
      const user = await User.create(input).save();

      sendRefreshToken(response, user);

      return {
        ok: true,
        accessToken: createAccessToken(user),
      };
    } catch (error) {
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
  @UseValidation(loginValidationSchema)
  async login(
    @Args("input", { type: () => LoginInput })
    { password, ...input }: LoginInput,
    @Context() { response }: IContext,
  ): Promise<IResolverResponse<LoginResponse>> {
    try {
      const user = await User.findOne({
        where: {
          ...removeNullPropertiesDeep(input),
          googleId: IsNull(),
        },
        select: {
          id: true,
          password: true,
        },
      });

      // se user existir e senha estiver correta é logado com sucesso
      if (user && (await bcrypt.compare(password, user.password!))) {
        sendRefreshToken(response, user);

        return {
          ok: true,
          accessToken: createAccessToken(user),
        };
      }

      const errorMessage = "Credenciais inválidas";

      return {
        ok: false,
        // mostrar erro genérico para todos os campos
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
      console.log({ time: new Date(), where: "mutation login", error });
      return defaultErrorResponse();
    }
  }

  @Mutation(() => LoginResponse)
  async loginWithGoogle(
    @Context() { request, response }: IContext,
  ): Promise<IResolverResponse<LoginResponse>> {
    try {
      const authorization = request.headers.authorization;

      if (!authorization) {
        return {
          ok: false,
          errors: [
            {
              path: "access_token",
              message: "missing Google OAuth2 access token",
            },
          ],
        };
      }

      const { status, data } = await axios.get<GoogleOAuthResponse>(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { authorization } },
      );

      if (status >= 400) {
        return {
          ok: false,
          errors: [
            {
              path: "access_token",
              message: "incorrect Google OAuth2 access token",
            },
          ],
        };
      }

      let user = await User.findOne({
        where: { googleId: data.sub },
        select: { id: true },
      });

      if (!user) {
        user = User.create({
          email: data.email,
          username: data.name.replace(" ", "-"),
          image: data.picture,
          googleId: data.sub,
        });

        try {
          await user.save();
        } catch (error) {
          // caso username seja duplicado, o que acontecerá caso tenha mais de um user usando google login com o mesmo nome
          if (
            error instanceof QueryFailedError &&
            error.message.includes(UNIQUE_USERNAME_INDEX)
          ) {
            user.username = `${user.username}-${getShortCode()}`;
            await user.save();
          } else {
            throw error;
          }
        }
      }

      sendRefreshToken(response, user);

      return {
        ok: true,
        accessToken: createAccessToken(user),
      };
    } catch (error) {
      console.log({ time: new Date(), where: "mutation login", error });
      return defaultErrorResponse();
    }
  }

  @Mutation(() => ResolverResponse)
  logout(@Context() { response }: IContext): IResolverResponse {
    try {
      response.clearCookie(process.env.COOKIE_NAME);
      return { ok: true };
    } catch (error) {
      console.log({ time: new Date(), where: "mutation logout", error });
      return defaultErrorResponse();
    }
  }
}
