const config = require("config");
const mysql = require("mysql");
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

const connection = mysql.createConnection({
    host: config.get("mysql.host"),
    user: config.get("mysql.user"),
    password: config.get("mysql.password"),
    database: config.get("mysql.database"),
    port: config.get("mysql.port")
});

connection.connect();

function getConnection() {
    if (!connection) {
        connection.connect();
    }
    return connection;
}
module.exports = {
    getConnection: getConnection
}