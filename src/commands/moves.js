const Command = require('../classes/command');

class Moves extends Command
{

    async run(character)
    {
        const fields = [];
        const moves = character.getMoves();

        for(let i in moves) {
            fields.push({
                name: moves[i].name,
                value: `${moves[i].learned}% learned\n` +
                    `${moves[i].description}`
            })
        }
        const embed = {
            title: `${character.name} moves`,
            fields
        };

        return this.message.channel.send({embeds: [embed]});
    }
}

module.exports = Moves;