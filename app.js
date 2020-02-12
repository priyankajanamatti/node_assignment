var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var cors = require('cors');
var expressJwt = require('express-jwt');
var httpProxy = require('http-proxy');
var flash = require('connect-flash');

var dbConfig = require('./db');
var app = express();


app.set('env', "development");

if (app.get('env') === 'development') {

    var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
        flags: 'a'
    });
    
    morganOptions = {
        stream: accessLogStream
    };
    app.use(logger('combined', morganOptions));

}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

var expressSession = require('express-session');

var sessionstore = require('sessionstore');
app.use(expressSession({
    store: sessionstore.createSessionStore(),
    secret: '!@product_category@!',
    resave: true,
    saveUninitialized: true,
    key: 'sid',
    cookie: {
        maxAge: null,
        httpOnly: true
    }

}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({
    limit: '10mb'
}));

app.use(require('express-method-override')('method_override_param_name'));

var proxyOptions = {
    changeOrigin: true
};

httpProxy.prototype.onError = function (err) {
    console.log(err);
};

var apiProxy = httpProxy.createProxyServer(proxyOptions);

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, if-none-match, x-access-token, Authorization');
    res.header("Access-Control-Expose-Headers", "Etag, Authorization, Origin, X-Requested-With, Content-Type, Accept, If-None-Match, Access-Control-Allow-Origin");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);

app.use(cookieParser());
app.use(express.static(path.join(__dirname + '.../public')));

var d = require('domain').create();
d.on('error', function (err, req, res, next) {

    var MongoMail = require(__dirname + '/utils/mailer');
    console.log('Oh no, something wrong with DB');
    mongoalertStatus = 1;
    data = {
        email: 'krupalsharmakn@gmail.com'
    };

});

d.run(function () {
    mongoose.connect(dbConfig.url);
    console.log("MongoDb connected Successfully !!!");
});

var MongoStore = require('connect-mongo')(expressSession);

app.use(expressSession({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60000 * 60 * 24 * 365},
    store: new MongoStore(
        {
            mongooseConnection: mongoose.connection, // it re- use the already connected instance
            autoRemoveExpiredSession: true,
        },

        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        })
}));

// Configuring Passport
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/v1/index')(passport);
var routesv1 = require('./routes/v1/index')(passport);
app.use(require('express-domain-middleware'));

app.use('/', routes);
app.use('/product_category/api/v1', routesv1);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(err.status || 404);
    res.send({
        "code": "404",
        "error": "Not Found"
    });
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        if (app.get('env') === 'production') {

            accessLogStream.write(err.stack);

        }
        console.log(err.message)
        res.status(err.status || 500);
       
        res.send({
            "code": "500",
            "error": "Internal Server Error"
        });
    });
}

if (app.get('env') === 'production') {

    console.log = function () {
    };

}


module.exports = app;
