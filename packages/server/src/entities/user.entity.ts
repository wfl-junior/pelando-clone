import { Field, ObjectType } from "@nestjs/graphql";
import bcrypt from "bcrypt";
import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { UNIQUE_EMAIL_INDEX, UNIQUE_USERNAME_INDEX } from "../constants";
import { EntityNode } from "./node.entity";

@ObjectType()
@Entity("users")
export class User extends EntityNode {
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

  @Column({ select: false })
  public password: string;

  @BeforeInsert()
  protected async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
