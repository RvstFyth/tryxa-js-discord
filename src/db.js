const mysql = require('mysql');
const config = require('./config.json');

let db;

module.exports = {

    init: function(user, pass) {
        db = this.getConnection(user, pass);
        require('./models/items').init(); // TODO: Define this at the right place
    },

    getConnection: function(user, pass) {
        if(!db) {
            // Initialize connection
            db = mysql.createPool({
                connectionLimit : 10,
                host: config.mysql.host,
                user: config.mysql.user,
                password: config.mysql.password,
                database: config.mysql.database,
                supportBigNumbers: true,
                bigNumberStrings: true
            });
        }
        return db;
    }
};