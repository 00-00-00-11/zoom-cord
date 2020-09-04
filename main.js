const discord = require('discord.js');
const client = new discord.Client();
const dotenv = require('dotenv-flow').config();
const fs = require('fs');

client.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
     const command = require(`./commands/${file}`);

     client.commands.set(command.name, command);
}

const {
     DISCORD_TOKEN: token,
     OWNER: owner,
     PREFIX: prefix
} = dotenv.parsed;

client.once('ready', ()=> {
    console.log('Ready to zoom!');
});

client.on('message', message => {
     if (!message.content.startsWith(prefix) || message.author.bot) return;

     const args = message.content.slice(prefix.length).split(/ +/);
     const command = args.shift().toLowerCase();

     if(command === 'ping') {
          client.commands.get('ping').execute(message, args);
     } else if (command === 'angry') {
          client.commands.get('angry').execute(message, args);
     }
});

const login = async () => {
     await client.login(token);
     return;
}

login();