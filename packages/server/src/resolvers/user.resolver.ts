import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { QueryFailedError } from "typeorm";
import { ValidationError } from "yup";
import { IContext } from "../@types/app";
import { UNIQUE_EMAIL_INDEX, UNIQUE_USERNAME_INDEX } from "../constants";
import { User } from "../entities/user.entity";
import { RegisterInput } from "../graphql-types/Input/RegisterInput";
import { RegisterResponse } from "../graphql-types/Object/users/RegisterResponse";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";
import { getRandomNumberBetween } from "../utils/getRandomNumberBetween";
import { createAccessToken, sendRefreshToken } from "../utils/jwt";
import { yupErrorResponse } from "../utils/yupErrorResponse";
import { registerValidationSchema } from "../yup/registerValidationSchema";

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => RegisterResponse)
  async register(
    @Args("input", { type: () => RegisterInput }) input: RegisterInput,
    @Context() { response }: IContext,
  ): Promise<RegisterResponse> {
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

  // @Mutation(() => LoginResponse)
  // async login() {}

  // @Query()
  // async me() {}
}
