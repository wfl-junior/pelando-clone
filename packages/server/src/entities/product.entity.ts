import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { EntityNode } from "./node.entity";

@ObjectType()
@Entity("products", { orderBy: { createdAt: "ASC" } })
export class Product extends EntityNode {
  @Field()
  @Column("text")
  body: string;

  @Field(() => String, { nullable: true })
  @Column({ name: "coupon_code", nullable: true, type: "varchar" })
  couponCode: string | null;

  @Field()
  @Column("float")
  price: number;

  @Field()
  @Column({ name: "source_url" })
  sourceUrl: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  image: string;
}
