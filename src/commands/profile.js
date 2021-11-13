const Command = require('../classes/command');

class Profile extends Command
{

    async run(character)
    {
        const fields = [];

        // Stats field
        fields.push({
            name: 'Stats',
            value: `` +
                `Strength: ${character.stats.strength}\n` +
                `Intelligence: ${character.stats.intelligence} \n` +
                `Wisdom: ${character.stats.wisdom} \n` +
                `Dextirity: ${character.stats.dexterity} \n` +
                `Constitution: ${character.stats.constitution} \n` +
                `Luck: ${character.stats.luck}`,
            inline: true
        });

        // Equipped field
        fields.push({
            name: 'Equipped',
            value: `` +
                `Head: ${character.equipped.head ? character.equipped.head.name : '...' }\n` +
                `Body: ${character.equipped.body ? character.equipped.body.name : '...' }\n` +
                `Hands: ${character.equipped.hands ? character.equipped.hands.name : '...' }\n` +
                `Legs: ${character.equipped.legs ? character.equipped.legs.name : '...' }\n` +
                `Weapon: ${character.equipped.weapon ? character.equipped.weapon.name : '...' }\n` +
                `Offhand: ${character.equipped.offhand ? character.equipped.offhand.name : '...' }\n` +
                `LFinger: ${character.equipped.lfinger ? character.equipped.lfinger.name : '...' }\n` +
                `RFinger: ${character.equipped.rfinger ? character.equipped.rfinger.name : '...' }\n`,
            inline: true
        })

        const embed = {
            title: character.name,
            description: `Level: ${character.level}\n` +
                `Xp: ${character.xp}`,
            fields
        }

        return this.message.channel.send({embeds: [embed]});
    }
}

module.exports = Profile;