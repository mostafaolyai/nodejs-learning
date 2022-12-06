const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-test',
    password: 'smo8082'
});

module.exports = pool.promise();