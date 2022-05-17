import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { EntityNode } from "./node.entity";
import { Product } from "./product.entity";

@ObjectType()
@Entity("categories", { orderBy: { createdAt: "ASC" } })
export class Category extends EntityNode {
  @Field()
  @Column()
  slug: string;

  @Field()
  @Column()
  title: string;

  @OneToMany(() => Product, product => product.store, { onDelete: "CASCADE" })
  products: Product[];
}
