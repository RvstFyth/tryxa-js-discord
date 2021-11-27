const equippedModel = require('../models/userEquipped');
const Command = require('../classes/command');

class Remove extends Command
{

    async run(character)
    {
        if(!this.arguments[0]) return this.message.channel.send(`**${character.name}** ${this.getTranslation('commands/remove', 'noArguments')}`);

        const validSlots = ['head', 'body', 'hands', 'legs', 'weapon', 'offhand', 'lfinger', 'rfinger'];
        if(validSlots.indexOf(this.arguments[0]) < 0) return this.message.channel.send(`**${character.name}** ${this.getTranslation('commands/remove', 'invalidSlot')}`);

        await equippedModel.setSlot(this.arguments[0], null, character.id);

        return this.message.channel.send(`**${character.name}** ${this.getTranslation('commands/remove', 'removed')}`);
    }
}

module.exports = Remove;