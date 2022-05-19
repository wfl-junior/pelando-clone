import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType({ isAbstract: true })
export abstract class EntityNode extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  @Index({ unique: true })
  public readonly id: string;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  public readonly createdAt: Date;

  // @Field()
  @UpdateDateColumn({ name: "updated_at" })
  public readonly updatedAt: Date;
}
