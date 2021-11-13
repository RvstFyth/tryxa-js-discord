const usersModel = require('../models/users');
const userStatsModel = require('../models/userStats');
const userEquippedModel = require('../models/userEquipped');

const Character = require('../classes/character');

module.exports = {

    async get(discordID)
    {
        const userRecord = await usersModel.getForDiscordID(discordID);
        if(userRecord) {
            const userStatsRecord = await userStatsModel.get(userRecord.id);
            if(!userStatsRecord) await userStatsModel.create(userRecord.id);

            const userEquippedRecord = await userEquippedModel.get(userRecord.id);
            if(!userEquippedRecord) await userEquippedModel.create(userRecord.id);

            const character = new Character(userRecord);
            character.setStatsFromDatabaseRecord(userStatsRecord);

            return character;
        }

        return null;
    },

    equate(xp)
    {
        return Math.floor(xp + 300 * Math.pow(2, xp / 7));
    },

    level_to_xp (level)
    {
        let xp = 0;
        for (let i = 1; i < level; i++) xp += this.equate(i);
        return Math.floor(xp / 4);
    },

    xp_to_level (xp)
    {
        let level = 1;
        while (this.level_to_xp(level) < xp) level++;
        return level;
    }
};
