class Character
{
    
    constructor(userRecord)
    {
        this.id = userRecord.id;
        this.name = userRecord.name;
        this.language = userRecord.translationCode;
        this.stats = {strength: 1, intelligence: 1, wisdom: 1, dexterity: 1, constitution: 1, luck: 1};
        this.xp = userRecord.xp;
        this.level = this.xpToLevel(this.xp);

        this.equipped = {head: null, body: null, hands: null, legs: null, weapon: null, offhand: null, lfinger: null, rfinger: null};
    }

    setEquipped(slot, item)
    {
        if(typeof this.equipped[slot] !== 'undefined') {
            this.equipped[slot] = item;
            for(let i in item.stats) {
                this.stats[i] += item.stats[i];
            }
        }
    }

    setStatsFromDatabaseRecord(statsRecord)
    {
        this.stats.strength = statsRecord.strength;
        this.stats.intelligence = statsRecord.intelligence;
        this.stats.wisdom = statsRecord.wisdom;
        this.stats.dexterity = statsRecord.dexterity;
        this.stats.constitution = statsRecord.constitution;
        this.stats.luck = statsRecord.luck;
    }

    levelToExp (level)
    {
        let xp = 0;
        for (let i = 1; i < level; i++) xp += Math.floor(i + 300 * Math.pow(2, i / 7));
        return Math.floor(xp / 4);
    }

    xpToLevel (xp)
    {
        let level = 1;
        while (this.levelToExp(level) < xp) level++;
        return level - 1;
    }
}

module.exports = Character;
