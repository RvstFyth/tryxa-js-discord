const Command = require('../classes/command');

class Equipped extends Command {

    async run(character)
    {
        const fields = [];

        for(let i in character.equipped) {
            fields.push({
                name: i,
                value: character.equipped[i] ?
                    `${character.equipped[i].name} (${character.equipped[i].level})`
                    : '..',
                inline: true
            });
        }
        const embed = {
            title: `${character.name} equipped`,
            fields: fields
        };

        return this.message.channel.send({embeds: [embed]});
    }
}

module.exports = Equipped;
