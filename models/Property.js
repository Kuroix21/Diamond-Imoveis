const db = require('./db');

const Property = db.sequelize.define('property_entities', {
    entity_id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: db.Sequelize.STRING
    },
    price: {
        type: db.Sequelize.FLOAT
    },
    rooms: {
        type: db.Sequelize.STRING   
    },
    bathrooms: {
        type: db.Sequelize.STRING   
    },
    square_meters: {
        type: db.Sequelize.STRING   
    },
    parking_spaces: {
        type: db.Sequelize.STRING   
    },
    bedrooms: {
        type: db.Sequelize.STRING   
    },
    type_property: {
        type: db.Sequelize.STRING   
    },
    street: {
        type: db.Sequelize.STRING   
    },
    city: {
        type: db.Sequelize.STRING   
    },
    state: {
        type: db.Sequelize.STRING   
    },
    postcode: {
        type: db.Sequelize.STRING   
    },
    tel: {
        type: db.Sequelize.STRING   
    },
    owner_id: {
        type: db.Sequelize.INTEGER   
    },
    description: {
        type: db.Sequelize.TEXT   
    },
    
    files_one: {
        type: db.Sequelize.TEXT   
    },
    
    files_two: {
        type: db.Sequelize.TEXT   
    },
    
    files_three: {
        type: db.Sequelize.TEXT   
    },
    
    files_four: {
        type: db.Sequelize.TEXT   
    },
    
    files_five: {
        type: db.Sequelize.TEXT   
    },
})

//Property.sync({force: true})
module.exports = Property;