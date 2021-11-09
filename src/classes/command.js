const emojiHelper = require('../helpers/emojis');

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
                const filter = (reaction, user) => reaction.emoji.name === emojiHelper.baseEmojis.confirm && user.id === this.message.author.id;

                msg.awaitReactions({filter, max: 1, time: 10*1000}).then(async collected => {
                    const reaction = collected.first();
                    if(reaction) resolve(true);
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
