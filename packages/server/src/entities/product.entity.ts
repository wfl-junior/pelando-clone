import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { EntityNode } from "./node.entity";
import { Store } from "./store.entity";

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

  @Column("uuid")
  storeId: string;

  @Field()
  @JoinTable()
  @ManyToOne(() => Store, store => store.products, {
    eager: true,
    onDelete: "CASCADE",
  })
  store: Store;
}
