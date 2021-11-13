const itemsModel = require('../models/items');
const Command = require('../classes/command');
const random = require('../helpers/random');

class Roll extends Command
{

    async run(character)
    {
        let level = 1;
        if (this.arguments[0] && !isNaN(this.arguments[0])) level = parseInt(this.arguments[0]);
        const tier = parseInt(level / 10);

        const slots = ['head', 'body', 'hands', 'legs', 'weapon', 'offhand', 'lfinger', 'rfinger'];
        const slot = random.arrayValue(slots);

        const stats = {
            strength: 0, intelligence: 0, wisdom: 0, dexterity: 0, constitution: 0,
        };

        const rarities = ['common', 'uncommon', 'rare', 'epic', 'LEGENDARY'];
        const rarity = random.weightedRandom(1, rarities.length);

        if(['lfinger', 'rfinger'].indexOf(slot) > -1)  stats['luck'] = 0;

        const maxStats = level + rarity;

        for(let i = 0; i <= maxStats; i++) { // levels + 1 = amount of stats point applied
            const randomStat = random.arrayValue(Object.keys(stats));
            stats[randomStat]++;
            if(random.number(1, 100) === 3) {
                const randomStat = random.arrayValue(Object.keys(stats));
                stats[randomStat]++;
            }
        }

        return this.message.channel.send({content: `Level: ${level}\nTier: ${tier}\nSlot: ${slot}\nRarity: ${rarities[rarity - 1]}\n${JSON.stringify(stats)}`});
    }
}

module.exports = Roll;