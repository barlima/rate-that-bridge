import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../entity/User";
import { Context } from "../types/graphql-utils";

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

    // TODO: optimize query
    return await User.findOne(userId, { relations: ["votes"] })
  }
}