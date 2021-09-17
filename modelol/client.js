const Sequelize = require('sequelize');
const database = require('./db');

const Client = database.define('client', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING
    },
    password_hash: {
        type: Sequelize.STRING
    },
    descricao: Sequelize.STRING
})
 
module.exports = Client;