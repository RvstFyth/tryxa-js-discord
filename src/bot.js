require('dotenv').config()
const { Client, Intents } = require('discord.js');

const Application = require('./classes/application');
const characterHelper = require('./helpers/character');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],
    partials: ["CHANNEL", "REACTION", "MESSAGE"]
});

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
            const character = await characterHelper.get(message.author.id);
            if(!character && ['start', 'help'].indexOf(commandName) < 0) return message.reply(`You don't have an account yet.. You can create one with the \`${prefix}start characterName\` command.`);
            const command = new instance(message, prefix);
            if(character) command.setTranslationCode(character.language);
            command.setArguments(msgSplitted.splice(1));
            await command.run(character);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
