import { Field, ObjectType } from "@nestjs/graphql";
import bcrypt from "bcrypt";
import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { UNIQUE_EMAIL_INDEX, UNIQUE_USERNAME_INDEX } from "../constants";
import { getRandomNumberBetween } from "../utils/getRandomNumberBetween";
import { EntityNode } from "./node.entity";

@ObjectType()
@Entity("users")
export class User extends EntityNode {
  @Column("varchar", { select: false, nullable: true })
  @Index({ unique: true })
  public googleId?: string | null;

  @Field()
  @Column()
  @Index(UNIQUE_EMAIL_INDEX, { unique: true })
  public email: string;

  @Field()
  @Column()
  @Index(UNIQUE_USERNAME_INDEX, { unique: true })
  public username: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { nullable: true })
  public image: string | null;

  @Column("float", { name: "product_vote_value" })
  public productVoteValue: number;

  @Column("varchar", { select: false, nullable: true })
  public password?: string | null;

  @BeforeInsert()
  protected async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // alterar para database trigger se possível
  @BeforeInsert()
  protected async requirePasswordIfNormalUser() {
    if (!this.googleId && typeof this.password !== "string") {
      throw new Error("password is required");
    }
  }

  @BeforeInsert()
  protected async addProductVoteValue() {
    this.productVoteValue = getRandomNumberBetween(6, 7);
  }
}
