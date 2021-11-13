const db = require('../db').getConnection();

module.exports = {

    table: 'items',

    async create(userID, name, rarity, slot, stats, level)
    {
        return new Promise(resolve => {
            db.query(
                `INSERT INTO {this.table} (user_id, \`name\`, rarity, slot, stats, \`level\`) VALUES (?,?,?,?,?,?)`,
                [userID, name, rarity, slot, stats, level],
                (err) => {
                    if(err) console.log(err);
                    else resolve(true);
                }
            );
        });
    },

    async get(id)
    {
        return new Promise(resolve => {
            db.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id], (err, rows) => {
                if(err) console.log(err);
                else resolve(rows[0]);
            });
        });
    },

    async getForUser(id, userID)
    {
        return new Promise(resolve => {
            db.query(`SELECT * FROM ${this.table} WHERE id = ? AND user_id = ?`, [id, userID], (err, rows) => {
                if(err) console.log(err);
                else resolve(rows[0]);
            });
        });
    },
}