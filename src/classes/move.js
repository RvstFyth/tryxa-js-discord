class Move
{

    constructor(character) {
        this.character = character;
        this.cooldown = 0;
        this.learned = null;
    }

    setLearned (val)
    {
        this.learned = val;
    }
}

module.exports = Move;