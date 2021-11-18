const Move = require('../move');

class Kick extends Move
{
    name = 'Kick';

    description = 'Kicks the selected target';

    constructor() {
        super();
    }
}

module.exports = Kick;