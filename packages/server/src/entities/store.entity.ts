import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { Product } from ".";
import { EntityNode } from "./node.entity";

@ObjectType()
@Entity("stores", { orderBy: { createdAt: "ASC" } })
export class Store extends EntityNode {
  @Field()
  @Column()
  @Index({ unique: true })
  public slug: string;

  @Field()
  @Column()
  public name: string;

  @Field()
  @Column()
  public url: string;

  @Field()
  @Column()
  public image: string;

  @OneToMany(() => Product, product => product.store, { onDelete: "CASCADE" })
  public products: Product[];
}
