import { ormconfig } from "@/ormconfig";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IContext } from "./@types/app";
import { RefreshAccessTokenController } from "./controllers/refresh-access-token.controller";
import * as Resolvers from "./resolvers";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    ...Object.values(Resolvers),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: "schema.gql",
      context: ({ req, res }): IContext => ({ request: req, response: res }),
    }),
  ],
  controllers: [RefreshAccessTokenController],
})
export class AppModule {}
