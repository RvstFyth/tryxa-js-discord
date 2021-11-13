const equippedModel = require('../models/userEquipped');
const Command = require('../classes/command');

class Remove extends Command
{

    async run(character)
    {
        if(!this.arguments[0]) return this.message.channel.send(`**${character.name}** what are you trying to remove?!?`);

        const validSlots = ['head', 'body', 'hands', 'legs', 'weapon', 'offhand', 'lfinger', 'rfinger'];
        if(validSlots.indexOf(this.arguments[0]) < 0) return this.message.channel.send(`**${character.name}** invalid slot provided...`);

        await equippedModel.setSlot(this.arguments[0], null, character.id);

        return this.message.channel.send(`**${character.name}** put the item back in their inventory`);
    }
}

module.exports = Remove;