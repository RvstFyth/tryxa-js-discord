const db = require('../db').getConnection();

module.exports = {

    table: 'user_equipped',

    async create(userID)
    {
        return new Promise(resolve => {
            db.query(`INSERT INTO ${this.table} (user_id) VALUES (?)`, [userID], (err) => {
                if(err) console.log(err);
                else resolve(true);
            });
        });
    },

    async get(userID)
    {
        return new Promise(resolve => {
            db.query(`SELECT * FROM ${this.table} WHERE user_id = ?`, [userID], (err, rows) => {
                if(err) console.log(err);
                else resolve(rows[0]);
            });
        });
    },

    async setSlot(slot, itemID, userID)
    {
        return new Promise(resolve => {
            db.query(`UPDATE ${this.table} SET \`${slot}\` = ? WHERE user_id = ?`, [itemID, userID], (err) => {
                if(err) console.log(err);
                else resolve(true);
            })
        });
    }
};
