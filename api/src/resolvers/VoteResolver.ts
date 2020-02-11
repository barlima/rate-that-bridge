import { Resolver, Mutation, Arg, Int, Query, Ctx } from "type-graphql";
import { Bridge } from "../entity/Bridge";
import { Vote } from "../entity/Vote";
import { User } from "../entity/User";
import { Context } from "../types/graphql-utils";

@Resolver()
export class VoteResolver {
  @Mutation(() => Vote, { nullable: true })
  async vote(
    @Arg('bridgeId', () => Int) bridgeId: number,
    @Ctx() ctx: Context,
  ) {
    const bridge = await Bridge.findOne(bridgeId);
    const user = await User.findOne(ctx.user.id);
    if (!bridge || !user) { return };
    const vote = await Vote.create({ bridge, user }).save()
    return vote;
  }

  @Mutation(() => Boolean)
  async deleteVote(@Arg('id', () => Int) id: number) {
    await Vote.delete(id);
    return true;
  }

  @Query(() => [Vote])
  votes() {
    return Vote.find({ relations: ["bridge", "user"] })
  }
}