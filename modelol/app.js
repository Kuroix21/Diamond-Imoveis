const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
const path = require('path');
const client = require('./routes/client')


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