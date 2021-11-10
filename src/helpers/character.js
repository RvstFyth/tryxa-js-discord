const usersModel = require('../models/users');
const userStatsModel = require('../models/userStats');

const Character = require('../classes/character');

module.exports = {

    async get(discordID)
    {
        const userRecord = await usersModel.getForDiscordID(discordID);
        if(userRecord) {
            const userStatsRecord = await userStatsModel.get(userRecord.id);
            const character = new Character(userRecord);
            character.setStatsFromDatabaseRecord(userStatsRecord);

            return character;
        }

        return null;
    }
};
