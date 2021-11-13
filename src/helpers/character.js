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
};
