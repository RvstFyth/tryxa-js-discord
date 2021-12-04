const random = require('../../helpers/random');
const Effect = require('../effect');

class Bleed extends Effect
{

    constructor(character, turns, minBleed, maxBleed) {
        super(character, turns);

        this.minBleed = minBleed;
        this.maxBleed = maxBleed;
    }

    post()
    {
        const damage = random.number(this.minBleed, this.maxBleed);
        this.character.stats.health -= damage;

        super.post();
        return `${this.character.name} got ${damage} damage from bleed..`
    }
}

module.exports = Bleed