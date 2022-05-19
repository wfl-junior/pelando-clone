import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { Category, Store } from ".";
import { EntityNode } from "./node.entity";

@ObjectType()
@Entity("products", { orderBy: { createdAt: "ASC" } })
export class Product extends EntityNode {
  @Field()
  @Column("text")
  public body: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { name: "coupon_code", nullable: true })
  public couponCode: string | null;

  @Field()
  @Column("float")
  public price: number;

  @Field()
  @Column({ name: "source_url" })
  public sourceUrl: string;

  @Field()
  @Column()
  public title: string;

  @Field()
  @Column()
  public image: string;

  @Column("uuid", { name: "store_id" })
  public storeId: string;

  @Field(() => Store)
  @JoinTable()
  @JoinColumn({ name: "store_id" })
  @ManyToOne(() => Store, store => store.products, { onDelete: "CASCADE" })
  public store: Store;

  @Column("uuid", { name: "category_id" })
  public categoryId: string;

  @Field(() => Category)
  @JoinTable()
  @JoinColumn({ name: "category_id" })
  @ManyToOne(() => Category, category => category.products, {
    onDelete: "CASCADE",
  })
  public category: Category;
}
