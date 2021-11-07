const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
const fs = require('fs');

let commands = [];
const files = fs.readdirSync(__dirname+'/commands');
for(let i = 0, iEnd = files.length; i < iEnd; i++) {
    if (files[i].match(/\.js$/) !== null) {
        const name = files[i].replace('.js', '');
        const d = require(__dirname+'/commands/'+files[i]);
        const c = new d();
        const s = new SlashCommandBuilder();
        s.setName(name);
        s.setDescription(c.description);

        commands.push(s);
    }
}

commands = commands.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(config.discord_token);
(async () => {
    await rest.put(Routes.applicationCommands(config.discord_client_id),{ body: commands },)
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
})();