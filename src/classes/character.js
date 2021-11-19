class Character
{
    
    constructor(userRecord)
    {
        this.id = userRecord.id;
        this.name = userRecord.name;
        this.language = userRecord.translationCode;
        this.stats = {strength: 1, intelligence: 1, wisdom: 1, dexterity: 1, constitution: 1, luck: 1};
        this.originalStats = {strength: 1, intelligence: 1, wisdom: 1, dexterity: 1, constitution: 1, luck: 1};
        this.xp = userRecord.xp;
        this.level = this.xpToLevel(this.xp);
        this.discordID = userRecord.discord_id;

        this.moves = [];
        this.effects = [];

        this.equipped = {head: null, body: null, hands: null, legs: null, weapon: null, offhand: null, lfinger: null, rfinger: null};

        this.ai = userRecord.ai;
    }

    setEffect(effect)
    {
        this.effects.push(effect);
    }

    setMove(move)
    {
        this.moves.push(move);
    }

    getMoves()
    {
        return this.moves;
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

    calculateStats()
    {
        this.stats = {...this.originalStats};

    }

    setStatsFromDatabaseRecord(statsRecord)
    {
        this.stats.strength = parseInt(statsRecord.strength);
        this.stats.intelligence = parseInt(statsRecord.intelligence);
        this.stats.wisdom = parseInt(statsRecord.wisdom);
        this.stats.dexterity = parseInt(statsRecord.dexterity);
        this.stats.constitution = parseInt(statsRecord.constitution);
        this.stats.luck = parseInt(statsRecord.luck);

        this.originalStats = {...this.stats};
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
