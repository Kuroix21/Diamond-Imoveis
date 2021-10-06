const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars')
const path = require('path');
const client = require('./routes/client')
const property = require('./routes/property')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
require('./config/auth')(passport)

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

//Session 
    app.use(session({secret: "session_diamond", resave: true, saveUninitialized: true}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

//Middleware 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.user = req.user || null;
    console.log("User: " + (req?.user?.first_name));
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


app.listen(port, err => {
    console.log(`Server is listening on ${port}`);
});