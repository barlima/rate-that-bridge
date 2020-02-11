import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Vote } from "./Vote";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  email: string;

  @Field()
  @Column()
  googleId: string;

  @Field()
  @Column({ default: false })
  admin: boolean

  @Field(() => [Vote], { defaultValue: [] })
  @OneToMany(() => Vote, vote => vote.bridge)
  votes: Vote[];
}
