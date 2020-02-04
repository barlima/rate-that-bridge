import session from "express-session"
import dotenv from "dotenv";

dotenv.config();

export default session({
  name: process.env.SESSION_NAME as string,
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24, // one day
  },
});