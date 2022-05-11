import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType({ isAbstract: true })
export abstract class EntityNode extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  // @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}
