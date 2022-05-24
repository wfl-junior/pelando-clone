import { Field, InputType } from "@nestjs/graphql";
import { OrderByDirection } from "../../enums/OrderByDirection";

@InputType()
export class ProductOrderByInput {
  @Field(() => OrderByDirection, { nullable: true })
  id?: OrderByDirection | null;

  @Field(() => OrderByDirection, { nullable: true })
  createdAt?: OrderByDirection | null;

  @Field(() => OrderByDirection, { nullable: true })
  body?: OrderByDirection | null;

  @Field(() => OrderByDirection, { nullable: true })
  couponCode?: OrderByDirection | null;

  @Field(() => OrderByDirection, { nullable: true })
  price?: OrderByDirection | null;

  @Field(() => OrderByDirection, { nullable: true })
  sourceUrl?: OrderByDirection | null;

  @Field(() => OrderByDirection, { nullable: true })
  title?: OrderByDirection | null;

  @Field(() => OrderByDirection, { nullable: true })
  temperature?: OrderByDirection | null;
}
