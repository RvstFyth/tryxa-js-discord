const usersModel = require('../models/users');
const Command = require('../classes/command');

class Language extends Command
{

    async run(character)
    {
        const validTranslationCodes = ['en', 'es', 'nl'];
        if(!this.arguments[0] || validTranslationCodes.indexOf(this.arguments[0]) < 0) {
            return this.message.channel.send({content: `**${character.name}**, ${this.getTranslation(
                    'commands/language', "missingOrInvalidTranslationCode", {str: validTranslationCodes.join(', ')}
                )}`});
        }

        await usersModel.setLanguageCode(character.id, this.arguments[0]);

        return this.message.channel.send(`**${character.name}**, ${this.getTranslation('commands/language', 'languageSet', {lang: this.arguments[0]})}`);
    }
}

module.exports = Language;