const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const passport = require('passport');


const Client = require('../models/Client')

router.get('/login', (req, res) => {
    res.render("login", {erros: ''})
});

router.post('/login', (req, res) => {
    var erros = [];

    if(!req.body.first_name) {
        erros.push({message: "Por favor insira seu primeiro nome"})
    }

    if(!req.body.last_name) {
        erros.push({message: "Por favor insira seu ultimo nome"})
    }

    if(!req.body.email) {
        erros.push({message: "Por favor insira seu email"})
    }

    if(!req.body.password) {
        erros.push({message: "Por favor insira uma senha"})
    }

    if(req.body.password < 6) {
        erros.push({message: "Senha muito curta"})
    }

    if(req.body.password_confirm !== req.body.password) {
        erros.push({message: "Senhas divergentes, tente novamente"})
    }

    if(erros.length > 0) {

        res.render("login", {erros: erros})

    } else {
        Client.findOne({where: {email: req.body.email}}).then((usuario) => {
            if(usuario?.length > 1) {
                req.flash("message_error", "Ja existe um usuario cadastrado com esses dados")
            } else {
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(req.body.password, salt, (erro, hash) => {
                        if(erro) {
                           req.flash("message_error", "Erro ao salvar")
                        }

                        Client.create({
                            email: req.body.email,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            cpf: req.body.cpf,
                            password_hash: hash,
                        }).then(_ => {
                            req.flash("success_msg", "Criado com sucesso!")
                            res.redirect('/')
                        }).catch(err => {
                            req.flash("message_error", "Houve um error")
                            res.redirect('/')
                        })
                    })
                })

            }
        }).catch((err) => {
            req.flash("message_error", "Houve um error interno")
            res.redirect("/")
        })
    }
});

router.post('/login/auth', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
        })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', "Deslogado com sucesso")
    res.redirect("/")
})

module.exports = router;