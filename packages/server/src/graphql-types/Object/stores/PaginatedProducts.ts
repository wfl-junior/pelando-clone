import { Store } from "@/src/entities/store.entity";
import { ObjectType } from "@nestjs/graphql";
import { BasePaginatedData } from "../BasePaginatedData";

@ObjectType()
export class PaginatedStores extends BasePaginatedData(Store) {}
