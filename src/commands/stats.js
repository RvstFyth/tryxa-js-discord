const Command = require('../classes/command');

class Stats extends Command
{

    async run(character)
    {
        const embed = {
            title: character.name,
            description: `` +
                `Strength: ${character.stats.strength}\n` +
            `Intelligence: ${character.stats.intelligence} \n` +
            `Wisdom: ${character.stats.wisdom} \n` +
            `Dextirity: ${character.stats.dexterity} \n` + 
            `Constitution: ${character.stats.constitution} \n` +
            `Luck: ${character.stats.luck}`
        };

        return this.message.channel.send({embeds: [embed]});
    }
}

module.exports = Stats;
