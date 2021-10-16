const express = require('express');
const router = express.Router()
const { isClient } = require('../helpers/isClient');

const Property = require('../models/property')

router.get('/anunciar', isClient , (req, res) => {

    res.render("anunciar", { erros:  '' })
}
);

router.get('/comprar', (req, res) => {
    Property.findAll({where: {
        type_property: 'venda'
      }}).then(properties => {
    res.render("comprar", { properties:  properties })
    console.log(properties)
    }).catch (err => {
        error = true,
        data= [],
        err = err
    })
}
);

router.get('/alugar', (req, res) => {
    Property.findAll({where: {
        type_property: 'aluguel'
      }}).then(properties => {
    res.render("alugar", { properties:  properties })
    console.log(properties)
    }).catch (err => {
        error = true,
        data= [],
        err = err

    })
}
);

router.get('/imovel/:id', (req, res) => {
    Property.findOne({where: {entity_id: req.params.id}}).then(property => {
        // retorna o usuário
        res.render("imovel", {property: property})
    }).catch(err => {
        if (err) res.send(err)
    })
})

router.post('/property/add', (req, res) => {
    var erros = [];

    if (!req.body.name) {
        erros.push({ message: "Por favor insira seu primeiro nome" })
    }

    if (!req.body.price) {
        erros.push({ message: "Por favor um preço" })
    }

    if (!req.body.square_meters) {
        erros.push({ message: "Por favor insira o tamanho do imovel" })
    }

    if (erros.length > 0) {

        res.render("anunciar", { erros: erros })

    } else {
        Property.create({
            name: req.body.name,
            price: req.body.price,
            bathrooms: req.body.bathrooms,
            square_meters: req.body.square_meters,
            parking_spaces: req.body.parking_spaces,
            bedrooms: req.body.bedrooms,
            type_property: req.body.type_property,
            owner_id: req.user.id,
            postcode: req.body.postcode,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            description: req.body.description,
        }).then(_ => {
            req.flash("success_msg", "Criado com sucesso!")
            res.redirect('/')
        }).catch(err => {
            console.log(err)
            req.flash("message_error", "Houve um error")
            res.redirect('/anunciar')
        })
    }
});

module.exports = router;