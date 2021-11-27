const Command = require('../classes/command');
const itemsModel = require('../models/items');

class Destroy extends Command
{

    async run(character)
    {
        if(this.arguments[0]) {
            const item = await itemsModel.getForUser(this.arguments[0], character.id);
            if(item) {
                await itemsModel.delete(item.id);
                return this.message.channel.send(`**${character.name}** destroyed a level ${item.level} ${item.name}`);
            }
        }
    }
}

module.exports = Destroy;