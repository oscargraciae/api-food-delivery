import passport from 'passport';
import LocalStrategy from 'passport-local';
// import FacebookStrategy from 'passport-facebook';
import FacebookStrategy from 'passport-facebook-token';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';

import db from './models';

// Local strategy
const localOpts = {
  usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await db.User.findOne({ where: { email } });
    // const valid = await bcrypt.compare(password, user.password);
    console.log("new password------>", password, user.password);
    if (!user) {
      return done(null, false);
    } else if (!await bcrypt.compare(password, user.password)) {
      console.log("new password------>", password, user.password);
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

const facebookParams = {
  clientID: '244527906154813',
  clientSecret: '5c211931e103db0ddf2cff33f909a246',
  // callbackURL: 'http://localhost:3001/auth/facebook/callback',
};

// Jwt Strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
  secretOrKey: 'secret',
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  console.log("PAYLOAD_---->", payload);
  try {
    const user = await db.User.findById(payload.id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use('facebookToken', new FacebookStrategy(facebookParams, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await db.User.findOne({ where: { facebookId: profile.id } });
    if (!user) {
      user = await db.User.create({
        facebookId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

export const authFacebook = passport.authenticate('facebookToken', { session: false });
export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
