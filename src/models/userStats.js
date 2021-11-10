const db = require('../db').getConnection();

module.exports = {

    table: 'user_stats',

    async create(userID) {
        return new Promise(resolve => {
            db.query(`INSERT INTO ${this.table} (user_id) VALUES (?)`, [userID], (err) => {
                if(err) console.log(err);
                else resolve(true);
            });
        });
    },

    async get(id) {
        return new Promise(resolve => {
            db.query(`SELECT * FROM ${this.table} WHERE user_id = ?`, [id], (err, rows) => {
                if(err) console.log(err);
                else resolve(rows[0]);
            });
        });
    }
};
