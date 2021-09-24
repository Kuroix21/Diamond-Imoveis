const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');

const Client = require('../models/Client')

router.get('/login', (req, res) => {
    res.render("login", {erros: ''})
});

router.post('/login', (req, res) => {
    var erros = [];

    if(!req.body.first_name) {
        erros.push("Por favor insira seu primeiro nome")
    }

    if(!req.body.last_name) {
        erros.push("Por favor insira seu ultimo nome")
    }

    if(!req.body.email) {
        erros.push("Por favor insira seu email")
    }

    if(!req.body.password) {
        erros.push("Por favor insira uma senha")
    }

    if(req.body.password < 6) {
        erros.push("Senha muito curta")
    }

    if(req.body.password_confirm !== req.body.password) {
        erros.push("Senhas divergentes, tente novamente")
    }

    if(erros.length > 0) {

        res.render("login", {erros: erros})

    } else {
        Client.findOne({where: {email: req.body.email, cpf: req.body.cpf}}).then((usuario) => {
            if(usuario != null) {
                res.render("login", {erros: ["Ja existe um usuario cadastrado com esses dados"]})
            } else {
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(req.body.password, salt, (erro, hash) => {
                        if(erro) {
                            res.render("login", {erros: ["Erro ao salvar"]})
                        }

                        Client.create({
                            email: req.body.email,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            cpf: req.body.cpf,
                            password_hash: hash,
                        }).then(_ => {
                            res.render("login", {erros: ["Criado com sucesso!"]})
                            res.redirect('/')
                        }).catch(err => {
                            res.render("login", {erros: ["Houve um error" + err.message]})
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