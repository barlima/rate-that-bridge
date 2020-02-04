import "reflect-metadata";
import * as dotenv from "dotenv";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BridgeResolver } from "./resolvers/BridgeResolver";
import { VoteResolver } from "./resolvers/VoteResolver";
import corsMiddleware from "./middleware/cors";
import sessionMiddleware from "./middleware/session";
import passportMiddleware from "./middleware/passport";

dotenv.config();

(async () => {
  const app = express();
  const port = process.env.PORT || 4000;

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );

  await createConnection({ ...options, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        BridgeResolver,
        VoteResolver
      ],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });

  app.use(corsMiddleware);
  app.use(sessionMiddleware);
  app.use(passportMiddleware.initialize());

  app.get('/auth/google', passportMiddleware.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback', 
    passportMiddleware.authenticate('google', { session: false }),
    (req, res) => {
      (req.session as any).userId = (req.user as any).id;
      res.redirect('/graphql');
  });

  apolloServer.applyMiddleware({ app, cors: false });
  
  app.listen(port, () => {
    console.log(`server started at ${process.env.API_HOST}:${port}/graphql`);
  });
})();
