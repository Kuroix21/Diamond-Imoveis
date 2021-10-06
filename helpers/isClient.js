module.exports = {
    isClient: function (req, res, next) {

        if(req.isAuthenticated()) {
            return next();
        } else {
            req.flash("error_msg", "Voce deve estar logado para entrar aqui")
            res.redirect("/")
        }
    }
}