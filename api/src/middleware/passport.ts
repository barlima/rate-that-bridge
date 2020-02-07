import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import dotenv from "dotenv";

import { User } from "../entity/User";

dotenv.config();

const port = process.env.PORT || 4000;

passport.serializeUser((user, done) => {  
  done(null, user);
});

passport.deserializeUser((userDataFromCookie, done) => {  
  done(null, userDataFromCookie);
});

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${process.env.API_HOST}:${port}/auth/google/callback`,
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

export default passport;