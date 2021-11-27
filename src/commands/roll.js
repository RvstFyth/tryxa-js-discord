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

        const slots = ['head', 'body', 'hands', 'legs', 'weapon', 'offhand', 'finger', 'finger'];
        const slot = random.arrayValue(slots);

        const stats = {
            strength: 0, intelligence: 0, wisdom: 0, dexterity: 0, constitution: 0,
        };

        const rarities = ['common', 'uncommon', 'rare', 'epic', 'LEGENDARY'];
        const rarity = random.weightedRandom(1, rarities.length);

        if(['finger', 'finger'].indexOf(slot) > -1)  stats['luck'] = 0;

        const maxStats = level + rarity;

        let name;
        switch (slot) {
            case 'finger': name = 'ring'; break;
            case 'body': name = 'armor'; break;
            case 'head': name = 'helmet'; break;
            case 'hands': name = 'gloves'; break;
            case 'legs': name = 'leggings'; break;
            case 'weapon': name = 'sword'; break;
            case 'offhand': name = 'shield'; break;
        }

        for(let i = 0; i <= maxStats; i++) { // levels + 1 = amount of stats point applied
            const randomStat = random.arrayValue(Object.keys(stats));
            stats[randomStat]++;
            if(random.number(1, 100) === 3) {
                const randomStat = random.arrayValue(Object.keys(stats));
                stats[randomStat]++;
            }
        }

        const finalStats = {};
        let statsString = '';
        for(let i in stats) {
            if(stats[i] > 0) finalStats[i] = stats[i];
            statsString += `;${i}:${stats[i]}`
        }

        await itemsModel.create(character.id, name, rarity, slot, statsString, level);
        return this.message.channel.send({content: `Name: ${name}\nLevel: ${level}\nTier: ${tier}\nSlot: ${slot}\nRarity: ${rarities[rarity - 1]}\n${JSON.stringify(finalStats)}`});
    }
}

module.exports = Roll;