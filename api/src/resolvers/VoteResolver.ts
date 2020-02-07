import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { Bridge } from "../entity/Bridge";
import { Vote } from "../entity/Vote";
import { User } from "../entity/User";

@Resolver()
export class VoteResolver {
  @Mutation(() => Vote)
  async vote(
    @Arg('bridgeId', () => Int) bridgeId: number,
    @Arg('userId', () => Int) userId: number
  ) {
    const bridge = await Bridge.findOne(bridgeId);
    const user = await User.findOne(userId);
    if (!bridge || !user) { return false };
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