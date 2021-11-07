const db = require('../db').getConnection();

module.exports = {

    table: 'users',

    async create(discordID, name)
    {
        return new Promise(resolve => {
            const values = [discordID, name];
            db.query(`INSERT INTO ${this.table} (discord_id, \`name\`) VALUES (?,?)`, values, (err, res) => {
                if(err) console.log(err);
                else resolve(res.insertId);
            });
        })
    },

    async getForDiscordID(discordID)
    {
        return new Promise(resolve => {
            db.query(`SELECT * FROM ${this.table} WHERE discord_id = ?`, [discordID], (err, rows) => {
                if(err) console.log(err);
                else resolve(rows[0]);
            })
        });
    }

}