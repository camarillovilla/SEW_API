const passport = require('passport');

// Se definen todas las estrategias de autenticación
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');
const GoogleStrategy = require('./strategies/google.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);
passport.use(GoogleStrategy);
