import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { REFRESH_ACCESS_TOKEN_ENDPOINT } from "../constants";
import { User } from "../entities";
import {
  createAccessToken,
  getTokenPayload,
  sendRefreshToken,
} from "../utils/jwt";

@Controller()
export class RefreshAccessTokenController {
  @Post(REFRESH_ACCESS_TOKEN_ENDPOINT)
  async refreshAccessToken(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    let accessToken: string | null = null;

    try {
      const token: string | undefined =
        request.cookies[process.env.COOKIE_NAME];

      if (!token) {
        throw new NoCookieError();
      }

      const { id } = getTokenPayload(token, true);

      const user = await User.findOneOrFail({
        where: { id },
        select: { id: true },
      });

      sendRefreshToken(response, user);
      accessToken = createAccessToken(user);
      response.status(200);
    } catch (error) {
      if (
        !(error instanceof JsonWebTokenError) &&
        !(error instanceof NoCookieError)
      ) {
        console.log({
          time: new Date(),
          where: "refresh access token endpoint",
          error,
        });
      }

      response.status(401);
    } finally {
      return response.json({
        ok: !!accessToken,
        accessToken,
        message: accessToken ? "success" : "not authenticated",
      });
    }
  }
}

class NoCookieError extends Error {
  constructor() {
    super("No Cookie");
  }
}
