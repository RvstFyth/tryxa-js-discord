const Command = require('../classes/command');
const usersModel = require('../models/users');
const userStatsModel = require('../models/userStats');

class Start extends Command
{
    help = '';
    info = true;
    description = `Create a account`;
    aliasses = [];

    async run(character)
    {
        if(character) {
            return this.message.channel.send({content:`**${this.message.author.username}** ${this.getTranslation('commands/start', 'alreadyRegistered')}`});
        }

        if(!this.arguments.length) {
            return this.message.channel.send({content:`**${this.message.author.username}**, ${this.getTranslation('commands/start', 'noNameProvided')}`});
        }

        const confirmed = await this.askToConfirm(`**${this.message.author.username}**, ${this.getTranslation('commands/start', 'confirm', {arg: this.arguments[0]})}`, true);
        if(confirmed) {
            const userID = await usersModel.create(this.message.author.id, this.arguments[0]);
            await userStatsModel.create(userID);
            await this.message.reply(`${this.getTranslation('commands/start', 'registered', {username: this.message.author.username})}`);
        }
    }
}

module.exports = Start;
