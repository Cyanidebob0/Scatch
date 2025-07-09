const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionConfig = (app) => {
  const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/scatch',
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60, // 14 days in seconds
    autoRemove: 'native' // Default
  });

  const sessionMiddleware = session({
    secret: process.env.EXPRESS_SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
  });

  app.use(sessionMiddleware);
  
  // Return the session middleware in case it's needed elsewhere
  return sessionMiddleware;
};

module.exports = sessionConfig;
