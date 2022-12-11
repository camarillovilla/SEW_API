const { Strategy } = require('passport-google-oauth20');
const AuthService = require('./../../../services/auth.service');
const service = new AuthService();

const GoogleStrategy = new Strategy({
  // Change to env variables
  clientID: "435295499503-5kcjtamggpn1gmjierujjre80l1diill.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3000/api/v1/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await service.getUserByGoogle(profile);

      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = GoogleStrategy;
