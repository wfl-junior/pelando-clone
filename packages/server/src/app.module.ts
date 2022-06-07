import { ormconfig } from "@/ormconfig";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IContext } from "./@types/app";
import { RefreshAccessTokenController } from "./controllers/refresh-access-token.controller";
import * as Resolvers from "./resolvers";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ...Object.values(Resolvers),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV === "development",
      autoSchemaFile: "schema.gql",
      context: ({ req, res }): IContext => ({ request: req, response: res }),
      cors: false,
    }),
  ],
  controllers: [RefreshAccessTokenController],
})
export class AppModule {}
