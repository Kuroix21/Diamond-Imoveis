const express = require('express');
const port = 5000;
const app = express();
const path = require('path');

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render("modelo", {
        title: "Diamond Imoveis"
    })
});

app.get('/login', function(req, res){
    res.render("login")
});

app.get('/anunciar', function(req, res){
    res.render("anunciar")
});

app.listen(port, err => {
    console.log(`Server is listening on ${port}`);
});

//index.js
(async () => {
    const database = require('./db');
    const Client = require('./client');
 
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();