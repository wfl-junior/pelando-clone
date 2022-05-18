import { Field, ObjectType } from "@nestjs/graphql";
import bcrypt from "bcrypt";
import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { UNIQUE_EMAIL_INDEX, UNIQUE_USERNAME_INDEX } from "../constants";
import { EntityNode } from "./node.entity";

@ObjectType()
@Entity("users", { orderBy: { createdAt: "ASC" } })
export class User extends EntityNode {
  @Field()
  @Column()
  @Index(UNIQUE_EMAIL_INDEX, { unique: true })
  email: string;

  @Field()
  @Column()
  @Index(UNIQUE_USERNAME_INDEX, { unique: true })
  username: string;

  @Field(() => String, { nullable: true })
  @Column("varchar", { nullable: true })
  image: string | null;

  @Column("float")
  offerVoteValue: number;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
