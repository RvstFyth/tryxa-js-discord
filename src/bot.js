const { Client, Intents } = require('discord.js');
const con = require('./config.json');

const Application = require('./classes/application');

//const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Loading commands..`);
    Application.setBotInstance(client);
    Application.loadCommands(__dirname+'/commands');
    console.log(`Commands loaded.. ${Object.keys(Application.commands).length}`)
});

const prefix = ',';

client.on('messageCreate', async message => {
    if(message.content.startsWith(prefix)) {
        const msgSplitted = message.content.substr(1).trimStart().split(' ');
        const commandName = msgSplitted[0];
        const instance = Application.getCommand(commandName);
        if (instance) {
            const command = new instance(message);
            await command.run();
        }
    }
});

client.login(con.discord_token);