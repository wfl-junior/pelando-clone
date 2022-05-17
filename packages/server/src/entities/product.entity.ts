import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { Category } from "./category.entity";
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

  @Column("uuid", { name: "store_id" })
  storeId: string;

  @Field(() => Store)
  @JoinTable()
  @JoinColumn({ name: "store_id" })
  @ManyToOne(() => Store, store => store.products, { onDelete: "CASCADE" })
  store: Store;

  @Column("uuid", { name: "category_id" })
  categoryId: string;

  @Field(() => Category)
  @JoinTable()
  @JoinColumn({ name: "category_id" })
  @ManyToOne(() => Category, category => category.products, {
    onDelete: "CASCADE",
  })
  category: Category;
}
