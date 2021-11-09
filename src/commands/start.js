const Command = require('../classes/command');
const usersModel = require('../models/users');

class Start extends Command
{
    help = '';
    info = true;
    description = `Create a account`;
    aliasses = [];

    async run()
    {
        const existingCharacter = await usersModel.getForDiscordID(this.message.author.id);
        if(existingCharacter) {
            return this.message.channel.send({content:`**${this.message.author.username}** you already have a account!`});
        }

        if(!this.arguments.length) {
            return this.message.channel.send({content:`**${this.message.author.username}**, please provide a name for your character..`});
        }

        const confirmed = await this.askToConfirm(`**${this.message.author.username}**, are you sure you want to name your character: ${this.arguments[0]}?`, true);
        if(confirmed) this.message.channel.send({content:`YES!`});
        else this.message.channel.send({content:`NO!`});
    }
}

module.exports = Start;