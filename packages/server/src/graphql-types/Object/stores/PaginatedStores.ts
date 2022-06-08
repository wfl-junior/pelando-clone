import { Store } from "@/src/entities";
import { ObjectType } from "@nestjs/graphql";
import { BasePaginatedData } from "../BasePaginatedData";

@ObjectType()
export class PaginatedStores extends BasePaginatedData(Store) {}
