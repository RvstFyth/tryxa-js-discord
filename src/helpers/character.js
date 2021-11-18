const usersModel = require('../models/users');
const itemsModel = require('../models/items');
const userStatsModel = require('../models/userStats');
const userEquippedModel = require('../models/userEquipped');
const userMovesModel = require('../models/userMoves');
const Item = require('../classes/item');
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

            const equipkeys = Object.keys(userEquippedRecord).filter(e => e !== 'user_id');
            const equippedIDs = [];
            for(let i of equipkeys) {
                if(userEquippedRecord[i]) equippedIDs.push(userEquippedRecord[i]);
            }

            const character = new Character(userRecord);
            character.setStatsFromDatabaseRecord(userStatsRecord);

            const equippedItems = await itemsModel.getWhereIdIn(equippedIDs);
            for(let i in equippedItems) {
                character.setEquipped(equippedItems[i].slot, new Item(equippedItems[i]));
            }

            const moves = await userMovesModel.getAllActiveFor(userRecord.id);
            for(let move of moves) {
                const module = require('../classes/moves/'+move.move);
                if(module) {
                    const m = new module(character);
                    m.setLearned(move.learned);
                    character.setMove(m);
                }
            }

            return character;
        }

        return null;
    },
};
