const Sequelize = require('sequelize');
const sequelize = new Sequelize('diamond_db', 'root', 'root', {dialect: 'mysql', host: 'localhost', port: 3006});
 
module.exports = sequelize;