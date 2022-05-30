import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { UserProductVoteType } from "../graphql-types/enums/UserProductVoteType";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity("user_product_vote")
export class UserProductVote extends BaseEntity {
  @PrimaryColumn("uuid", { name: "user_id" })
  public readonly userId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  public readonly user: User;

  @PrimaryColumn("uuid", { name: "product_id" })
  public readonly productId: string;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  public readonly product: Product;

  @Column()
  public type: UserProductVoteType;

  @CreateDateColumn({ name: "created_at" })
  public readonly createdAt: Date;
}
