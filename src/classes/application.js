const fs = require('fs');

class Application
{
    constructor() {
        this.bot = null;
        this.commands = {};
    }

    setBotInstance(bot)
    {
        this.bot = bot;
    }

    getBotInstance()
    {
        return this.bot;
    }

    loadCommands(path)
    {
        fs.readdirSync(path).forEach(file => {
            if (file.match(/\.js$/) !== null) {
                const name = file.replace('.js', '');
                delete require.cache[require.resolve(path + '/' + file)];
                this.commands[name] = require(path + '/' + file);
            }
        });
    }

    getCommand(val)
    {
        return this.commands[val];
    }
}

module.exports = new Application();
