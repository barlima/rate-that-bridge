import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Bridge } from "./Bridge";
import { User } from "./User";

@ObjectType('vote')
@Entity()
export class Vote extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn() // verifiy
  created: Date;

  @Field()
  @UpdateDateColumn()
  updated: Date;

  @Field(() => Bridge, { nullable: true })
  @ManyToOne(() => Bridge, bridge => bridge.votes)
  bridge: Bridge;

  @Field(() => User)
  @ManyToOne(() => User, user => user.votes)
  user: User;
}