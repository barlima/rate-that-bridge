import { registerEnumType, InputType, Field } from "type-graphql";

interface CurrentUser {
  id?: string
}

export interface Context {
  req: Express.Session,
  res: Express.Response,
  user: CurrentUser
}

export interface ResolverMap {
  [key: string]: {
    [key: string]: (
      parent: any,
      args: any,
      context: Context,
    ) => any;
  };
}

export enum Period {
  TODAY,
  THIS_WEEK,
  THIS_MONTH,
  ALL_TIME,
}

registerEnumType(Period, {
  name: "Period",
  description: "Top bridges periods",
});

// export enum BridgeFilter {
//   ALL,
//   VOTED,
//   NOT_VOTED,
// }

// registerEnumType(BridgeFilter, {
//   name: "BridgeFilter",
//   description: "VOTED | NOT_VOTED | ALL",
// });

export enum Voted {
  ALL,
  VOTED,
  NOT_VOTED,
}

registerEnumType(Voted, {
  name: "Voted",
  description: "VOTED | NOT_VOTED | ALL",
});

@InputType()
export class BridgeFilter {
  @Field(() => Voted, { defaultValue: Voted.ALL })
  voted: Voted;

  @Field(() => Boolean, { defaultValue: true })
  verified: Boolean;
}