import { Resolver, Query, Ctx, ObjectType, Field, Int } from "type-graphql";
import { User } from "../entity/User";
import { Context } from "../types/graphql-utils";
import { createQueryBuilder } from "typeorm";

@ObjectType()
class Stats {
  @Field(() => Int)
  bridges: number

  @Field(() => Int)
  users: number

  @Field(() => Int)
  votes: number

  constructor(bridges: number, users: number, votes: number) {
    this.bridges = bridges;
    this.votes = votes;
    this.users = users;
  }
}

@Resolver()
export class UserResolver {
  // @Mutation(() => User)
  // ToDo Add mutations to update and delete

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context) {
    const userId = ctx.user.id;

    if(!userId) {
      return null;
    }

    return await User.findOne(userId, { relations: ["votes"] })
  }

  @Query(() => Stats, { nullable: true })
  async stats(@Ctx() ctx: Context) {
    const user = await User.findOne(ctx.user.id, { relations: ["votes"] })

    if (!user || !user.admin) {
      return null;
    }

    const bridges = await createQueryBuilder('Bridge').getCount();
    const users = await createQueryBuilder('User').getCount();
    const votes = await createQueryBuilder('Vote').getCount();

    return new Stats(bridges, users, votes);
  }
}