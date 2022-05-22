import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AppModule } from "./app.module";
import { FRONTEND_URL, REFRESH_ACCESS_TOKEN_ENDPOINT } from "./constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      credentials: true,
      origin: FRONTEND_URL,
    }),
  );
  app.use(REFRESH_ACCESS_TOKEN_ENDPOINT, cookieParser());

  await app.listen(4000);
}

bootstrap();
