import { Product } from "@/src/entities";
import { ObjectType } from "@nestjs/graphql";
import { BasePaginatedData } from "../BasePaginatedData";

@ObjectType()
export class PaginatedProducts extends BasePaginatedData(Product) {}
