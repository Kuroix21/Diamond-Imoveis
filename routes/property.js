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
    res.render("comprar", { properties:  properties }
    ).catch (err => {
        error = true,
        data= [],
        err = err
    })
}
      )}
);

router.get('/alugar', (req, res) => {
    Property.findAll({where: {
        type_property: 'aluguel'
      }}).then(properties => {
    res.render("alugar", { properties:  properties })
    }).catch (err => {
        error = true,
        data= [],
        err = err
    })
}
);

router.get('/imovel/:id', (req, res) => {
    Property.findOne({where: {entity_id: req.params.id}}).then(property => {
        res.render("imovel", {property: property})
    }).catch(err => {
        if (err) res.send(err)
    })
})

router.post('/property/add', (req, res) => {
    var erros = [];

    if (!req.body.name) {
        erros.push({ message: "Por favor insira um nome para o seu imovel (Titulo principal)" })
    }

    if (!req.body.price) {
        erros.push({ message: "Por favor um preço" })
    }

    if (!req.body.square_meters) {
        erros.push({ message: "Por favor insira o tamanho do imovel" })
    }

    if (!req.body.bathrooms) {
        erros.push({ message: "Por favor insira o numero de banheiros. Caso não haja digite 0" })
    }

    if (!req.body.parking_spaces) {
        erros.push({ message: "Por favor insira o numero de vagas na garagem. Caso não haja digite 0" })
    }

    if (!req.body.bedrooms) {
        erros.push({ message: "Por favor insira o numero de quartos. Caso não haja digite 0" })
    }

    if (!req.body.postcode) {
        erros.push({ message: "Por favor insira um CEP valido." })
    }

    if (!req.body.street) {
        erros.push({ message: "Por favor insira uma rua valida." })
    }

    if (!req.body.city) {
        erros.push({ message: "Por favor insira uma cidade valida." })
    }

    if (!req.body.city) {
        erros.push({ message: "Por favor insira uma cidade valida." })
    }

    if (!req.body.state) {
        erros.push({ message: "Por favor insira um estado valido." })
    }

    if (!req.body.description) {
        erros.push({ message: "Por favor insira uma descrição valida." })
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
            req.flash("message_error", "Houve um error")
            res.redirect('/anunciar')
        })
    }
});

router.get('/client/properties', isClient, (req, res) => {
    Property.findAll({where: {
        owner_id: req.user.id
      }}).then(properties => {
    res.render("propriedades", { properties:  properties })
    }).catch (err => {
        error = true,
        data= [],
        err = err
    })
}
);

router.get('/client/property/edit/:id', (req, res) => {
    Property.findOne({where: {entity_id: req.params.id}}).then(property => {
        res.render("imovel-edit", {property: property})

    }).catch(err => {
        if (err) res.send(err)
    })
})
router.post('/client/property/edit/save', (req, res) => {
    console.log("o id é = " + req.body.id)
    Property.findOne({where: {entity_id: req.body.id}}).then(property => {
        var erros = [];

        if (!req.body.name) {
            erros.push({ message: "Por favor insira um nome para o seu imovel (Titulo principal)" })
        }
    
        if (!req.body.price) {
            erros.push({ message: "Por favor um preço" })
        }
    
        if (!req.body.square_meters) {
            erros.push({ message: "Por favor insira o tamanho do imovel" })
        }
    
        if (!req.body.bathrooms) {
            erros.push({ message: "Por favor insira o numero de banheiros. Caso não haja digite 0" })
        }
    
        if (!req.body.parking_spaces) {
            erros.push({ message: "Por favor insira o numero de vagas na garagem. Caso não haja digite 0" })
        }
    
        if (!req.body.bedrooms) {
            erros.push({ message: "Por favor insira o numero de quartos. Caso não haja digite 0" })
        }
    
        if (!req.body.postcode) {
            erros.push({ message: "Por favor insira um CEP valido." })
        }
    
        if (!req.body.street) {
            erros.push({ message: "Por favor insira uma rua valida." })
        }
    
        if (!req.body.city) {
            erros.push({ message: "Por favor insira uma cidade valida." })
        }
    
        if (!req.body.state) {
            erros.push({ message: "Por favor insira um estado valido." })
        }
    
        if (!req.body.description) {
            erros.push({ message: "Por favor insira uma descrição valida." })
        }

    
        if (!req.body.tel) {
            erros.push({ message: "Por favor insira um telefone valido." })
        }
        if (erros.length > 0) {
            res.render("imovel-edit", { 
                erros: erros,
                property: property 
            })
        } else {
            console.log("entrou no else")
            property.update({
                name: req.body.name,
                price: req.body.price,
                bathrooms: req.body.bathrooms,  
                square_meters: req.body.square_meters,
                parking_spaces: req.body.parking_spaces,
                bedrooms: req.body.bedrooms,
                type_property: req.body.type_property,
                postcode: req.body.postcode,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                description: req.body.description,
                tel: req.body.tel,
            })
            req.flash("success_msg", "Propriedade editada com sucesso!")
            res.redirect("/client/properties")
        }
    }).catch(err => {
        req.flash("message_error", "Houve um error ao editar a propriedade")
        res.redirect('/')
    })
})
module.exports = router;