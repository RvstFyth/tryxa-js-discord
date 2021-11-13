const Command = require('../classes/command');
const itemsModel = require('../models/items');
const equippedModel = require('../models/userEquipped');

class Equip extends Command
{

    async run(character)
    {
        if(!this.arguments[0]) return this.message.channel.send(`**${character.name}**, what are you trying to equip??`);

        const item = await itemsModel.getForUser(this.arguments[0], character.id);
        if(!item) return this.message.channel.send(`**${character.name}** you don't own a item with id ${this.arguments[0]}`);

        if(character.level < item.level) return this.message.channel.send(`**${character.name}** you need to be at least level ${item.level} to equip this..`);
        await equippedModel.setSlot(item.slot, item.id, character.id);
        return this.message.channel.send(`YES`)
    }
}

module.exports = Equip;