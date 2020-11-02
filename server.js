const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session info
const sess = {
  secret: 'This is a secret that I cannot store in the env file because Heroku',
  cookie: {
    maxAge: 1000 * 60 * 60 // Expire after one hour (1000 ms in a second * 60 seconds * 60 minutes)
  },
  rolling: true, // If the user is using the web site, reset the maxAge
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// turn on routes
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});