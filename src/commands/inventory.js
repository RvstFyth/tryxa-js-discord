const Command = require('../classes/command');
const itemsModel = require('../models/items');

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

        let str = '';
        for(let i in items) {
            str += `${items[i].id} | ${items[i].name} (${items[i].level})\n`;
        }
        str += `\n\nPage: ${page}/${totalPages}`;
        const embed = {
            title: `${character.name} inventory`,
            description: str
        }

        return this.message.channel.send({embeds: [embed]});
    }
}

module.exports = Inventory;