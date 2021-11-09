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
    }
};
