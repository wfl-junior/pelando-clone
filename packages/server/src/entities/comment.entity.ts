import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Product, User } from ".";
import { EntityNode } from "./node.entity";

@ObjectType()
@Entity("comments")
export class Comment extends EntityNode {
  @Column("uuid", { name: "user_id" })
  public readonly userId: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  public readonly user: User;

  @Column("uuid", { name: "product_id" })
  public readonly productId: string;

  @Field(() => Product)
  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  public readonly product: Product;

  @Field()
  @Column()
  public body: string;
}
