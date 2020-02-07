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