import { registerEnumType } from "@nestjs/graphql";

export enum UserProductVoteType {
  HOT,
  COLD,
}

registerEnumType(UserProductVoteType, { name: "UserProductVoteType" });
