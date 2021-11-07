const Command = require('../classes/command');

class Help extends Command
{
    help = '';
    info = true;
    description = `Help files for \`tryxa\``;
    aliasses = ['h'];

    async run()
    {
        this.message.channel.send({content:`Hi!`});
    }
}

module.exports = Help;