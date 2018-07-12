const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const csrf = require('csurf');
const bodyParser = require('body-parser');

const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');

const app = express();

// Set app locals
app.locals = require('./config/local');

require('dotenv').config();
require('./config/db')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(express.static(path.join(__dirname, 'public')));

// mount api before csrf is appended to the app stack
app.use('/api', apiRouter);

// enable csrf protection
app.use(csrf({ cookie: true }));

// setup session and flash.
const sessionConfig = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
};
app.use(session(sessionConfig));
app.use(flash());

// Setup passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Setup routes.
app.use('/', webRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handlers
app.use((err, req, res, next) => {
    if (req.xhr) {
        res.status(err.status || 500);
        return res.send({
            status: false,
            message: err.message || "Something went wrong!"
        });
    } else {
        return next(err);
    }
});
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
