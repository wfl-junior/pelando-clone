import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category, Store } from ".";
import { UserProductVoteType } from "../graphql-types/enums/UserProductVoteType";
import { Comment } from "./comment.entity";
import { EntityNode } from "./node.entity";

@ObjectType()
@Entity("products")
export class Product extends EntityNode {
  @Field()
  @Column("text")
  public body: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { name: "coupon_code", nullable: true })
  public couponCode: string | null;

  @Field()
  @Column("double", { precision: 10, scale: 2 })
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

  @Field()
  @Column("float", { default: 0 })
  public temperature: number;

  @Field(() => UserProductVoteType, {
    nullable: true,
    description: "Requires logged in user with valid access token",
  })
  public userVoteType: UserProductVoteType;

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

  @Field(() => [Comment])
  @OneToMany(() => Comment, comment => comment.product, {
    onDelete: "CASCADE",
  })
  public comments: Comment[];
}
