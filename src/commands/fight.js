const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const Command = require('../classes/command');
const Character = require('../classes/character');
const random = require('../helpers/random');
const itemsHelper = require('../helpers/items');
const usersModel = require('../models/users');

const mobs = [
    {
        name: 'mutated potato',
        moves: {kick: 35},
        stats: {strength: 1, intelligence: 1, wisdom: 1, dexterity: 1, constitution: 1, luck: 1},
    }
];

class Fight extends Command
{

    async run(character)
    {
        let level;
        if(!isNaN(this.arguments[0])) level = parseInt(this.arguments[0]);
        else level = character.level;

        const mob = this.composeMob(mobs[level - 1], level);

        return this.turn(character, mob);
    }

    async turn(character, mob, lastResult = null)
    {
        const fields = [];

        for(let char of [character, mob]) {
            const field = {
                name: char.name,
                value: ``,
                inline: true
            };

            field.value += `Health: ${char.stats.health} \n`;
            field.value += `Strength: ${char.stats.strength} \n`;
            field.value += `Intelligence: ${char.stats.intelligence} \n`;
            field.value += `Wisdom: ${char.stats.wisdom} \n`;
            field.value += `Dexterity: ${char.stats.dexterity} \n`;
            field.value += `Constitution: ${char.stats.constitution} \n`;

            fields.push(field);
        }

        const embed = {
            title: `${character.name} vs ${mob.name}`,
            fields,
            description: lastResult ? lastResult : 'Select a move from the list'
        }

        const menu = this.composeSelectMoveMenu(character, mob);

        this.message.channel.send({embeds: [embed], components: [menu]}).then(async message => {
            const filter = (interaction) => interaction.customId === 'select_move' && interaction.user.id === character.discordID;

            message.awaitMessageComponent({ filter, time: 10 * 60 * 1000, max: 99 })
                .then(async interaction => {
                    const selectedMove = interaction.values[0];
                    if(selectedMove) {
                        const move = Object.values(character.moves).filter(m => m.name === selectedMove)[0];
                        if(move) {

                            interaction.update({
                                components: [],
                            });

                            let result = move.run([mob]);
                            if(mob.stats.health < 1) return this.playerWon(character, mob);

                            const aiMove = random.arrayValue(Object.values(mob.moves));
                            if(character.stats.health < 1) return this.playerLost(character, mob);

                            if(aiMove) {
                                result += `\n${aiMove.run([character])}`
                            }

                            return this.turn(character, mob, result);
                        }
                    }
                })
        });
    }

    async playerWon(character, mob)
    {
        const level = mob.level;
        const xpGain = parseInt((7 + level) * 1.6);
        await usersModel.addXp(character.id, xpGain);

        const gold = random.number((level * 2), (level * 20));
        await usersModel.addGold(character.id, gold);

        return this.message.channel.send(`**${character.name}** won against ${mob.name}!\nRewards: ${xpGain}xp and ${gold} gold..`);
    }

    async playerLost(character, mob)
    {
        return this.message.channel.send(`**${character.name}** lost against ${mob.name}...`);
    }

    composeSelectMoveMenu(character, mob)
    {
        const row = new MessageActionRow();
        const menu = new MessageSelectMenu();
        menu.setCustomId('select_move')
        const moves = character.getMoves();
        const options = [];
        for(let move of moves) {
            options.push({
                label: `${move.name}`,
                description: move.description,
                value: move.name
            });
        }

        menu.addOptions(options);
        row.addComponents([menu]);

        return row;
    }

    composeMob(mobData, level)
    {
        const mob = new Character({
            name: mobData.name,
            level,
            ai: true
        });
        mob.setStatsFromDatabaseRecord(mobData.stats);

        for(let i in mobData.moves) {
            const mod = require('../classes/moves/'+i);
            const m = new mod(mob);
            m.setLearned(mobData.moves[i]);
            mob.setMove(m);
        }

        return mob;
    }
}

module.exports = Fight;