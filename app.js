const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {configViewEngine} = require('./config/setViewEngine');
const {initWebRoute} = require('./routes/users.routes');
const {sessionStore} = require('./config/connectMySQL');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const TWO_HOURS = 1000 * 60 * 60 * 10

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: TWO_HOURS,
        secure: false
    }
}))

configViewEngine(app);
initWebRoute(app);
app.listen(port,()=>{
    console.log(`Example app listening at http://127.0.0.1:${port}`)
})