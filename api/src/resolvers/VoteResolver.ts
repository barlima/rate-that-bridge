import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { Bridge } from "../entity/Bridge";
import { Vote } from "../entity/Vote";

@Resolver()
export class VoteResolver {
  @Mutation(() => Vote)
  async vote(@Arg('bridgeId', () => Int) bridgeId: number) {
    const bridge = await Bridge.findOne(bridgeId);
    if (!bridge) { return false };
    const vote = await Vote.create({ bridge }).save()
    return vote;
  }

  @Mutation(() => Boolean)
  async deleteVote(@Arg('id', () => Int) id: number) {
    await Vote.delete(id);
    return true;
  }

  @Query(() => [Vote])
  votes() {
    return Vote.find({ relations: ["bridge"] })
  }
}