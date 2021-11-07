const Command = require('../classes/command');

class Start extends Command
{
    help = '';
    info = true;
    description = `Create a account`;
    aliasses = [];

    async run()
    {
        this.message.channel.send({content:`Start!`});
    }
}

module.exports = Start;