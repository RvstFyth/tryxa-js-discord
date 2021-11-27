const db = require('../db').getConnection();

module.exports = {

    table: 'items',

    async create(userID, name, rarity, slot, stats, level)
    {
        return new Promise(resolve => {
            db.query(
                `INSERT INTO ${this.table} (user_id, \`name\`, rarity, slot, stats, \`level\`) VALUES (?,?,?,?,?,?)`,
                [userID, name, rarity, slot, stats, level],
                (err, res) => {
                    if(err) console.log(err);
                    else resolve(res.insertId);
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

    async getAllForUser(userID)
    {
        return new Promise(resolve => {
            db.query(`SELECT * FROM ${this.table} WHERE user_id = ? ORDER BY id DESC`, [userID], (err, rows) => {
                if(err) console.log(err);
                else resolve(rows);
            });
        });
    },

    async getWhereIdIn(ids)
    {
        return new Promise(resolve => {
            db.query(`SELECT * FROM ${this.table} WHERE id IN (?)`, [ids], (err, rows) => {
                if(err) console.log(err);
                else resolve(rows);
            });
        });
    },

    async delete(id)
    {
        return new Promise(resolve => {
            db.query(`DELETE FROM ${this.table} WHERE id = ?`, [id], (err) => {
                if(err) console.log(err);
                else resolve(true);
            })
        });
    }
}