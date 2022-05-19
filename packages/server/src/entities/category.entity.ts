import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { Product } from ".";
import { EntityNode } from "./node.entity";

@ObjectType()
@Entity("categories", { orderBy: { createdAt: "ASC" } })
export class Category extends EntityNode {
  @Field()
  @Column()
  @Index({ unique: true })
  public slug: string;

  @Field()
  @Column()
  public title: string;

  @OneToMany(() => Product, product => product.store, { onDelete: "CASCADE" })
  public products: Product[];
}
