import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserProductVoteType } from "../graphql-types/enums/UserProductVoteType";

@Entity("user_product_vote")
export class UserProductVote extends BaseEntity {
  @PrimaryColumn("uuid", { name: "user_id" })
  public readonly userId: string;

  @PrimaryColumn("uuid", { name: "product_id" })
  public readonly productId: string;

  @Column()
  public type: UserProductVoteType;

  @CreateDateColumn({ name: "created_at" })
  public readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public readonly updatedAt: Date;
}
