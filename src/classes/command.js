const emojiHelper = require('../helpers/emojis');

const emojis = [emojiHelper.baseEmojis.confirm, emojiHelper.baseEmojis.deny];

class Command
{

    constructor(message) {
        this.message = message;
        this.arguments = [];
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
