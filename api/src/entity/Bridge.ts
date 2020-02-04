import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Vote } from "./Vote";

@ObjectType()
@Entity()
export class Bridge extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  city: string;

  @Field(() => Int, { nullable: true })
  @Column('int', { nullable: true })
  year: number;

  @Field()
  @Column()
  pictureUrl: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  url: string;

  @Field(() => [Vote], { defaultValue: [] })
  @OneToMany(() => Vote, vote => vote.bridge)
  votes: Vote[];
  
}