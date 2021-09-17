const db = require('./db');

const Client = db.sequelize.define('client', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
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