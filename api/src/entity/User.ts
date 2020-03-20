import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Vote } from "./Vote";

@ObjectType('user')
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Field()
  @Column('text', { nullable: true })
  googleId: string;

  @Field()
  @Column({ default: false })
  admin: boolean

  @Field(() => [Vote], { defaultValue: [] })
  @OneToMany(() => Vote, vote => vote.bridge)
  votes: Vote[];
}
