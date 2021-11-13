class Character
{
    
    constructor(userRecord)
    {
        this.id = userRecord.id;
        this.name = userRecord.name;

        this.stats = {strength: 1, intelligence: 1, wisdom: 1, dexterity: 1, constitution: 1, luck: 1};

        this.equipped = {head: null, body: null, hands: null, legs: null, weapon: null, offhand: null, lfinger: null, rfinger: null};
    }

    setEquipped(slot, item)
    {
        if(typeof this.equipped[slot] !== 'undefined') {
            this.equipped[slot] = item;
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
}

module.exports = Character;
