const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars')
const path = require('path');
const client = require('./routes/client')
const property = require('./routes/property')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
const routes = require('./routes');
require('./config/auth')(passport)

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

//Session 
    app.use(session({secret: "session_diamond", resave: true, saveUninitialized: true}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())


var http = require('http');
var url = require('url') ;
//Middleware 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.user = req.user || null;
    res.locals.baseUrl = req.headers.host

    next();
})

// Setup view engine
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views/'))
app.engine('handlebars', handlebars({ extname: 'handlebars', defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }))
app.set('view engine', 'handlebars')

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Multer

// Enable CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use('/', routes);
  // Essa linha faz o servidor disponibilizar o acesso às imagens via URL!

// ...

app.use('/public', express.static(path.join(__dirname, 'public')));
//Routers

app.use('/', client)
app.use('/', property)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render("modelo", {
        title: "Diamond Imoveis"
    })
});

app.get('/alugar', function(req, res){
    res.render("alugar")
});

app.get('/comprar', function(req, res){
    res.render("comprar")
});

app.get('/detalhes', function(req, res){
    res.render("detalhes")
});

app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
