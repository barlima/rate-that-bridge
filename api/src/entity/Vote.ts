import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Bridge } from "./Bridge";

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Bridge, { nullable: true })
  @ManyToOne(() => Bridge, bridge => bridge.votes)
  bridge: Bridge;
}