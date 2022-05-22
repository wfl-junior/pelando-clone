import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserProductVoteType } from "../graphql-types/enums/UserProductVoteType";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity("user_product_vote", { orderBy: { createdAt: "ASC" } })
export class UserProductVote extends BaseEntity {
  @Column()
  public type: UserProductVoteType;

  @PrimaryColumn("uuid", { name: "user_id" })
  public readonly userId: string;

  @ManyToOne(() => User, user => user.productVotes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  public user: User;

  @PrimaryColumn("uuid", { name: "product_id" })
  public readonly productId: string;

  @ManyToOne(() => Product, product => product.userVotes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  public product: Product;

  @CreateDateColumn({ name: "created_at" })
  public readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public readonly updatedAt: Date;
}
