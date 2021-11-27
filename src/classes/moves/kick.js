const Move = require('../move');
const random = require('../../helpers/random');

class Kick extends Move
{
    name = 'Kick';

    description = 'Kicks the selected target';

    constructor(character)
    {
        super(character);
    }

    run(targets)
    {
        const target = targets[0];
        if(target) {
            const dmg = random.number(1, this.character.stats.strength);
            target.stats.health -= dmg;
            return `${this.character.name} kicked ${targets[0].name} and did ${dmg} damage`;
        }
        else {
            // TODO:
        }
    }
}

module.exports = Kick;