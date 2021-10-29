const localStrategy = require('passport-local');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs')


require('../models/Client')
const Client = require('../models/Client')

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        Client.findOne({where: {email: email}}).then((user) => {
            if(!user) {
                return done(null, false, {message: 'Conta inexistente'})
            } 

            bcrypt.compare(password, user.password_hash, (error, success) => {
                if(success) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Senha incorreta'})
                    
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        Client.findByPk(id).then(user => {
            done(null, user);
          }).catch(err => done(err));
    })
}