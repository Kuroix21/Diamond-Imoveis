const db = require('./db');

const Client = db.sequelize.define('customer_entities', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING
    },
    password_hash: {
        type: db.Sequelize.STRING
    }
})
 

//Client.sync({force: true})
module.exports = Client;