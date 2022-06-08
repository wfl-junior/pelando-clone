import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { AppModule } from "./app.module";
import { FRONTEND_URL, REFRESH_ACCESS_TOKEN_ENDPOINT } from "./constants";
import { DefaultErrorInterceptor } from "./interceptors/default-error.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      credentials: true,
      origin: FRONTEND_URL,
    }),
  );

  app.use(REFRESH_ACCESS_TOKEN_ENDPOINT, cookieParser());
  app.useGlobalInterceptors(new DefaultErrorInterceptor());

  await app.listen(4000);
}

bootstrap();
