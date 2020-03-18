import session from "express-session"
import dotenv from "dotenv";
// import connectFileStore from "session-file-store"
// import connectRedis from "connect-redis";

dotenv.config();

// const RedisStore = connectRedis(session);
// const FileStore = connectFileStore(session);

export default session({
  // store: new FileStore({}),
  name: process.env.SESSION_NAME as string,
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
  },
});