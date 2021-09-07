const express = require('express');
const port = 3000;
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/inicio', function(req, res){
    res.render("modelo")
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