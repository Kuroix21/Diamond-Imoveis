const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
var flash        = require('req-flash');
router.use(flash());

const Client = require('../models/Client')

router.get('/login', (req, res) => {
    res.render("login", {erros: ''})
});

router.post('/login', (req, res) => {
    var erros = [];

    if(!req.body.name) {
        erros.push("Por favor insira seu nome")
    }

    if(!req.body.email) {
        erros.push("Por favor insira seu email")
    }

    if(!req.body.password_hash) {
        erros.push("Por favor insira uma senha")
    }

    if(req.body.password_hash < 6) {
        erros.push("Senha muito curta")
    }

    if(req.body.password_hash_confirm !== req.body.password_hash) {
        erros.push("Senhas divergentes, tente novamente")
    }

    if(erros.length > 0) {

        res.render("login", {erros: erros})

    } else {
        Client.findOne({where: {email: req.body.email}}).then((usuario) => {
            if(usuario != null) {
                res.send("Ja existe uma conta com este email cadastrado")
                res.redirect("/login")
            } else {
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(req.body.password_hash, salt, (erro, hash) => {
                        if(erro) {
                            res.send("Erro ao salvar")
                            res.redirect("/")
                        }

                        Client.create({
                            email: req.body.email,
                            name: req.body.name,
                            cpf: req.body.cpf,
                            password_hash: hash,
                        }).then(funciton => {
                            res.send("Criado com sucesso!");
                            res.redirect('/')
                        }).catch(err => {
                            res.send("Houve um error" + err.message);
                            res.redirect('/')
                        })
                    })
                })

            }
        }).catch((err) => {
            res.send("Houve um erro interno")
            res.redirect("/")
        })
    }
});

module.exports = router;