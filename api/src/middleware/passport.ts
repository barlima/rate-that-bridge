import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { User } from "../entity/User";

dotenv.config();

const port = process.env.API_PORT || 4000;
const host = process.env.NODE_ENV === "production"
  ? process.env.API_HOST
  : `${process.env.API_HOST}:${port}`;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userDataFromCookie, done) => {
  done(null, userDataFromCookie);
});

// Google Strategy
passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${host}/auth/google/callback`,
  },
  async (_, __, profile, cb) => {
    const { id, name, emails } = profile;

    let email: string | undefined;
    let firstName: string | undefined;
    let lastName: string | undefined;

    if (name) {
      firstName = name.givenName;
      lastName = name.familyName
    }

    if (emails && emails?.length > 0) {
      const verifiedEmail = emails.find(e => (e as any).verified);
      if (verifiedEmail) {
        email = verifiedEmail.value;
      }
    }

    let user = await User.findOne({
      where: { googleId: id }
    })

    // register new user
    if (!user) {
      user = await User.create({
        googleId: id,
        firstName,
        lastName,
        email,
      }).save();
    }

    return cb(undefined, { id: user.id });
  }
));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, cb) => {
    try {
      let user = await User.findOne({ where: { email: username }});

      if (!user) {
        return cb(undefined, undefined);
      }

      const passwordMatch = await bcrypt.compare(password, user?.password);

      if (user.googleId || !passwordMatch) {
        return cb(undefined, undefined);
      }

      return cb(undefined, { id: user.id });
    } catch (error) {
      return cb(error);
    } 
  }
));

export default passport;