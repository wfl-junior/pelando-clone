import { Class } from "@/@types/app";
import { Field, ObjectType } from "@nestjs/graphql";
import { PageInfo } from "./PageInfo";

export function BasePaginatedData<T>(ClassRef: Class<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedData {
    @Field(() => [ClassRef])
    edges: T[];

    @Field(() => PageInfo)
    info: PageInfo;
  }

  return PaginatedData;
}
