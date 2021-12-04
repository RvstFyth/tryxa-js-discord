const Bleed = require('../effects/bleed');
const Move = require('../move');

class Stab extends Move
{
    name = 'Stab';

    description = 'Causes the target too bleed for 3 turns';

    constructor(character) {
        super(character);

        this.cooldown = 5;
    }

    run(targets)
    {
        // todo, target constitution should lower the amount a bit
        const target = targets[0];
        const min = Math.max(1, parseInt(parseInt(this.character.stats.strength) / 10));
        const max = Math.max(1, parseInt(parseInt(this.character.stats.strength) / 5));

        const effect = new Bleed(target, 3, min, max);
        target.setEffect(effect);

        return `${this.character.name} stabbed ${target.name}, causing bleed for 3 turns..`
    }
}

module.exports = Stab;