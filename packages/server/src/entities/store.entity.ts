import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { EntityNode } from "./node.entity";
import { Product } from "./product.entity";

@ObjectType()
@Entity("stores", { orderBy: { createdAt: "ASC" } })
export class Store extends EntityNode {
  @Field()
  @Column()
  @Index({ unique: true })
  slug: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  url: string;

  @Field()
  @Column()
  image: string;

  @OneToMany(() => Product, product => product.store, { onDelete: "CASCADE" })
  products: Product[];
}
