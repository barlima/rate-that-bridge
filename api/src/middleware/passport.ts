import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import dotenv from "dotenv";

import { User } from "../entity/User";

dotenv.config();

const port = process.env.PORT || 4000;

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${process.env.API_HOST}:${port}/auth/google/callback`,
  },
  async (_, __, profile, cb) => {
    const { id, name } = profile;

    let firstName: string | undefined;
    let lastName: string | undefined;

    if (name) {
      firstName = name.givenName;
      lastName = name.familyName
    }

    let user = await User.findOne({
      where: { googleId: id}
    })

    // register new user
    if (!user) {
      user = await User.create({
        googleId: id,
        firstName,
        lastName,
      }).save();
    }

    return cb(undefined, { id: user.id });
  }
));

export default passport;