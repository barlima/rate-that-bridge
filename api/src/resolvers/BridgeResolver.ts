import { Resolver, Mutation, Arg, Int, Query, InputType, Field, Ctx } from "type-graphql";
import { Bridge } from "../entity/Bridge";
import { Context, Period, BridgeFilter } from "../types/graphql-utils";
import { getDate } from '../helpers/time';
import { createQueryBuilder } from "typeorm";

@InputType()
class BridgeInput {
  @Field()
  name: string;

  @Field()
  country: string

  @Field()
  city: string

  @Field(() => Int, { nullable: true })
  year?: number

  @Field()
  pictureUrl: string

  @Field(() => String, { nullable: true })
  url?: string
}

@InputType()
class BridgeUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  country?: string

  @Field(() => String, { nullable: true })
  city?: string

  @Field(() => Int, { nullable: true })
  year?: number

  @Field(() => String, { nullable: true })
  pictureUrl?: string

  @Field(() => String, { nullable: true })
  url?: string
}

@Resolver()
export class BridgeResolver {
  @Mutation(() => Bridge)
  async createBridge(
    @Arg('options', () => BridgeInput) options: BridgeInput
  ) {
    const bridge = await Bridge.create(options).save();
    return bridge;
  }

  @Mutation(() => Boolean)
  async updateBridge(
    @Arg('id', () => Int) id: number,
    @Arg('input', () => BridgeUpdateInput) input: BridgeUpdateInput
  ) {
    await Bridge.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteBridge(
    @Arg('id', () => Int) id: number
  ) {
    await Bridge.delete({ id });
    return true;
  }

  @Query(() => [Bridge])
  bridges(
    @Ctx() ctx: Context,
    @Arg('filter', () => BridgeFilter, { defaultValue: BridgeFilter.ALL }) filter?: BridgeFilter,
  ) {
    switch (filter) {
      case BridgeFilter.NOT_VOTED:
        return createQueryBuilder('Bridge')
          .leftJoinAndMapMany(
            "Bridge.votes",
            "Vote",
            "vote",
            "Bridge.id = vote.bridgeId AND vote.userId = :userId",
            { userId: ctx.user.id })
          .where("vote.id IS NULL")
          .getMany()
      case BridgeFilter.VOTED:
        return createQueryBuilder('Bridge')
          .innerJoinAndMapMany("Bridge.votes", "Vote", "vote", "Bridge.id = vote.bridgeId")
          .where("vote.userId = :userId", { userId: ctx.user.id })
          .getMany()
      default:
        return Bridge
          .find({ relations: ["votes"] })
    }
  }
  
  @Query(() => [Bridge])
  async topBridges(@Arg('period', () => Period) period: Period) {
    const createdAfter = getDate(period);

    const bridges = await createQueryBuilder('Bridge')
      .innerJoinAndMapMany("Bridge.votes", "Vote", "vote", "Bridge.id = vote.bridgeId")
      .where("vote.created > :date", { date: createdAfter })
      .getMany();

    return bridges.sort((a,b) => (b as Bridge).votes.length - (a as Bridge).votes.length);
  }
}