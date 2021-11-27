const Command = require('../classes/command');
const itemsModel = require('../models/items');
const itemsHelper = require('../helpers/items');

class Inventory extends Command
{

    async run(character)
    {
        const allItems = await itemsModel.getAllForUser(character.id);
        const perPage = 10;
        let page = 1;
        if(!isNaN(this.arguments[0])) page = parseInt(this.arguments[0]);

        const totalPages = Math.ceil(allItems.length / perPage);
        if(page > totalPages) page = totalPages;

        const offset = page > 1 ? page * perPage - perPage : 0;
        const items = allItems.splice(offset, perPage);

        const equippedIDs = character.getEquippedIDs();

        let str = '';
        for(let i in items) {
            let equipped = equippedIDs.indexOf(items[i].id) > -1;
            if(equipped) str += `**`;
            str += `${items[i].id} | ${items[i].name} (${items[i].level}) | ${itemsHelper.rarityMapping[items[i].rarity]} ${equipped ? `**` : ``}\n`;
        }
        const fields = [
            {
                name: `\u200b`,
                value: `` +
                    `\`${this.prefix}equip <id>\` to equip an item\n` +
                    `\`${this.prefix}destroy <id>\` to destroy an item`
            }
        ];
        const embed = {
            title: `${character.name} inventory`,
            description: str,
            footer: {
                text: `Page: ${page}/${totalPages}`
            },
            fields
        }

        return this.message.channel.send({embeds: [embed]});
    }
}

module.exports = Inventory;