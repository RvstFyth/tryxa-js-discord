class Item
{
    constructor(record)
    {
        this.id = record.id;
        this.name = record.name;
        this.rarity = record.rarity;
        this.slot = record.slot;
        this.rawStats = record.stats;
        this.stats = {};
        this.level = record.level;

        this.parseStats();
    }

    parseStats()
    {
        const parsed = this.rawStats.split(';');
        for(let i in parsed) {
            const sub = parsed[i].split(':');
            this.stats[sub[0]] = parseInt(sub[1]);
        }
    }
}

module.exports = Item;