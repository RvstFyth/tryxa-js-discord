const Move = require('../move');

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

        }
        else {
            // TODO:
        }
    }
}

module.exports = Kick;