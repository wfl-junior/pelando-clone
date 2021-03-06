import { Field, ObjectType } from "@nestjs/graphql";
import bcrypt from "bcrypt";
import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { UNIQUE_EMAIL_INDEX, UNIQUE_USERNAME_INDEX } from "../constants";
import { getRandomNumberBetween } from "../utils/getRandomNumberBetween";
import { EntityNode } from "./node.entity";

@ObjectType()
@Entity("users")
export class User extends EntityNode {
  @Column("varchar", { select: false, nullable: true, name: "google_id" })
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

  private get type(): "google" | "normal" {
    if (this.googleId) {
      return "google";
    }

    return "normal";
  }

  @BeforeInsert()
  protected async hashPassword() {
    if (typeof this.password === "string") {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // alterar para database trigger se possível
  @BeforeInsert()
  protected async requirePasswordIfNormalUser() {
    if (this.type === "normal" && typeof this.password !== "string") {
      throw new Error("Password is required");
    }
  }

  @BeforeInsert()
  protected async addProductVoteValue() {
    this.productVoteValue = getRandomNumberBetween(6, 7);
  }
}
