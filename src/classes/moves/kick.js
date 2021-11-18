const Move = require('../move');

class Kick extends Move
{
    name = 'Kick';

    description = 'Kicks the selected target';

    constructor(character) {
        super(character);
    }
}

module.exports = Kick;