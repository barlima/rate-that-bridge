import { Resolver, Mutation, Arg, Int, Query, InputType, Field, Ctx } from "type-graphql";
import { Bridge } from "../entity/Bridge";
import { Context } from "../types/graphql-utils";

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
  bridges(@Ctx() ctx: Context) {
    console.log(ctx.user);
    return Bridge.find({ relations: ["votes"] })
  }
}