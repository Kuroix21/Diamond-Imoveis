const db = require('./db');

const Property = db.sequelize.define('property_entities', {
    property_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    entity_id: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: db.Sequelize.STRING
    },
    price: {
        type: db.Sequelize.FLOAT
    },
    description: {
        type: db.Sequelize.STRING   
    }
})

//Property.sync({force: true})
module.exports = Client;