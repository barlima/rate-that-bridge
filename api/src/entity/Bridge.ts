import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Vote } from "./Vote";

@ObjectType('bridge')
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

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  region: string;

  @Field(() => Int, { nullable: true })
  @Column('int', { nullable: true })
  year: number;

  @Field()
  @Column()
  pictureUrl: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  url: string;

  @Field()
  @Column({ default: false })
  verified: boolean

  @Field(() => [Vote], { defaultValue: [] })
  @OneToMany(() => Vote, vote => vote.bridge)
  votes: Vote[];
}