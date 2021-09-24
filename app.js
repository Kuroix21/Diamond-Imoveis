const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
const path = require('path');
const client = require('./routes/client')
const session = require('express-session');
const flash = require('connect-flash');

//Session 

    app.use(session({secret: "session_diamond", resave: true, saveUninitialized: true}))
    app.use(flash())

//Middleware 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routers

app.use('/', client)

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
    res.render("modelo", {
        title: "Diamond Imoveis"
    })
});


app.get('/anunciar', function(req, res){
    res.render("anunciar")
});


app.listen(port, err => {
    console.log(`Server is listening on ${port}`);
});