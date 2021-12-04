class Effect
{

    constructor(character, turns) {
        this.character = character;
        this.turns = turns;
    }

    post()
    {
        this.turns--;
    }
}

module.exports = Effect;