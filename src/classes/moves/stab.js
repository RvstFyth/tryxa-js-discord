const Move = require('../move');

class Stab extends Move
{
    name = 'Stab';

    description = 'Causes the target too bleed for 3 turns';

    constructor() {
        super();

        this.cooldown = 5;
    }
}

module.exports = Stab;