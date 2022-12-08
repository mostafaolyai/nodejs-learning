const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-test','root','smo8082',{
    dialect : 'mysql',
    host:'localhost',
})

module.exports = sequelize