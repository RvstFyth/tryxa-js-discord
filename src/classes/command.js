const emojiHelper = require('../helpers/emojis');

const emojis = [emojiHelper.baseEmojis.confirm, emojiHelper.baseEmojis.deny];

class Command
{

    constructor(message, prefix) {
        this.message = message;
        this.arguments = [];
        this.prefix = prefix;
        this.translationCode = 'en';
    }

    getTranslation(path, key, replace = {})
    {
        const translationFile = require('../../public/translations/' + path);
        if(translationFile && translationFile[key]) {
            let str;
            if(translationFile[key][this.translationCode]) str = translationFile[key][this.translationCode];
            else str = translationFile[key]['en'];

            const replaceKeys = Object.keys(replace);
            if(replaceKeys.length) {
                for(let i in replaceKeys) {
                    str = str.replace(`%${replaceKeys[i]}%`, replace[replaceKeys[i]]);
                }
            }

            return str;
        }
        else return 'Translation not found...';
    }

    setTranslationCode(code)
    {
        this.translationCode = code;
    }

    setArguments(args)
    {
        this.arguments = args;
    }

    async askToConfirm(description, removeAfterTimeout = false)
    {
        return new Promise(resolve => {
            const embed = {
                title: `Confirm`,
                description
            };

            this.message.channel.send({embeds: [embed]}).then(async msg => {
                await msg.react(emojiHelper.baseEmojis.confirm);
                await msg.react(emojiHelper.baseEmojis.deny);
                const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && user.id === this.message.author.id;

                msg.awaitReactions({filter, max: 1, time: 10*1000}).then(async collected => {
                    const reaction = collected.first();
                    if(reaction && reaction.emoji.name === emojiHelper.baseEmojis.confirm) resolve(true);
                    else {
                        if(removeAfterTimeout) await msg.delete();
                        resolve(false);
                    }
                })
            }).catch(e => console.log(e));
        });
    }
}

module.exports = Command;
