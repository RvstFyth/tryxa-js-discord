const Command = require('../classes/command');
const itemsModel = require('../models/items');
const equippedModel = require('../models/userEquipped');

class Equip extends Command
{

    async run(character)
    {
        if(!this.arguments[0]) return this.message.channel.send(`**${character.name}**, ${this.getTranslation('commands/equip', 'noArguments')}`);

        const item = await itemsModel.getForUser(this.arguments[0], character.id);
        if(!item) return this.message.channel.send(`**${character.name}** you don't own a item with id ${this.arguments[0]}`);
        if(!item) return this.message.channel.send(`**${character.name}** ${this.getTranslation('commands/equip', 'notFound', {id: this.arguments[0]})}`);

        if(character.level < item.level) return this.message.channel.send(`**${character.name}** ${this.getTranslation('commands/equip', 'lowLevel', {level: item.level})}`);
        await equippedModel.setSlot(item.slot, item.id, character.id);
        return this.message.channel.send(`**${character.name}** ${this.getTranslation('commands/equip', 'equipped', {item: item.name})}`);
    }
}

module.exports = Equip;