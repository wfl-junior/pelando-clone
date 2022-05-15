import { ormconfig } from "@/ormconfig";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Resolvers from "./resolvers";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ...Object.values(Resolvers),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: "schema.gql",
    }),
  ],
})
export class AppModule {}
