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
                port: 3306,
                user: config.mysql.user,
                password: config.mysql.password,
                database: config.mysql.database,
                supportBigNumbers: true,
                bigNumberStrings: true
            });
        }
        return db;
    },

    get: function(table, id)
    {
       return new Promise(resolve => {
           db.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, rows) => {
               if (err) console.log(err);
               resolve(rows[0]);
           });
       });
    },

    insert(table, keysValues)
    {
        return new Promise(resolve => {
            const keys = Object.keys(keysValues);
            const values = Object.values(keysValues);

            let queryString = '';
            for(let i = 0, iEnd = keys.length; i < iEnd; i++) {
                if(i > 0) queryString += ','
                queryString += ` ${keys[i]} = ?`
            }

            const query = `INSERT INTO ${table} VALUES`
        });
    }
};