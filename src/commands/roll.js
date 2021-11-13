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

        const stats = {
            strength: 0, intelligence: 0, wisdom: 0, dexterity: 0, constitution: 0, luck: 0
        };

        for(let i = 0; i <= level; i++) { // levels + 1 = amount of stats point applied
            const randomStat = random.arrayValue(Object.keys(stats));
            stats[randomStat]++;
            if(random.number(1, 100) === 3) {
                const randomStat = random.arrayValue(Object.keys(stats));
                stats[randomStat]++;
            }
        }

        return this.message.channel.send({content: `Level: ${level}\nTier: ${tier}\n${JSON.stringify(stats)}`});
    }
}

module.exports = Roll;