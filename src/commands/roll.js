const itemsModel = require('../models/items');
const Command = require('../classes/command');
const random = require('../helpers/random');
const itemsHelper = require('../helpers/items');

class Roll extends Command
{

    async run(character)
    {
        const item = await itemsHelper.rollItem(character.id, character.level);

        let statsString = '';
        for(let i in item.stats) {
            if(i) statsString += `${i}: ${item.stats[i]}, `
        }

        const embed = {
            title: `${character.name} item roll`,
            description: `` +
                `Name: ${item.name}\n` +
                `Level: ${item.level}\n` +
                `Stats: ${statsString}\n`+
                `Rarity: ${itemsHelper.rarityMapping[item.rarity - 1]}`
        };

        return this.message.channel.send({embeds: [embed]});
    }
}

module.exports = Roll;