const db = require('../db').getConnection();

module.exports = {
    table: 'user_moves',

    async create(userID, move, learned, active = false)
    {
        const values = [userID, move, learned, active];
        return new Promise(resolve => {
            db.query(`INSERT INTO ${this.table} (user_id, move, learned, active) VALUES (?,?,?,?)`, values, (err) => {
                if(err) console.log(err);
                else resolve(true);
            })
        });
    },

    async getAllFor(userID)
    {
        return new Promise(resolve => {
            db.query(`SELECT * FROM ${this.table} WHERE user_id = ?`, [userID], (err, rows) => {
                if(err) console.log(err);
                else resolve(true);
            })
        });
    }
};