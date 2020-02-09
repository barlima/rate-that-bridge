import { registerEnumType } from "type-graphql";

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