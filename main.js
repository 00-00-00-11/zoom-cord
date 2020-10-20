const discord = require('discord.js');
const client = new discord.Client();
const dotenv = require('dotenv-flow').config();
const fs = require('fs');
const autoRole = require('./autoRole')

client.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
     const command = require(`./commands/${file}`);

     client.commands.set(command.name, command);
}

const {
     BOT_TOKEN: token,
     OWNER: owner,
     PREFIX: prefix
} = dotenv.parsed;

client.once('ready', () => {
    console.log('Ready to zoom!');
    autoRole(client)
});

client.on('message', message => {
     if (!message.content.startsWith(prefix) || message.author.bot) return;

     const args = message.content.slice(prefix.length).split(/ +/);
     const command = args.shift().toLowerCase();

     switch (command) {
          case 'breakout':
               client.commands.get('breakout').execute(message, args, prefix);
               break
          case 'close':
               client.commands.get('close').execute(message)
               break;
          case 'setup':
               client.commands.get('setup').execute(message)
               break;
          case 'move-back':
               client.commands.get('move-back').execute(message)
               break
          case 'poll':
               client.commands.get('poll').execute(message, args)
               break;
          case 'help':
               client.commands.forEach(com => {
                    message.channel.send(`\`\`\`\nName: ${com.name}\nDescription: ${com.description}\n\`\`\``)
               })
               break
          default:
               message.channel.send('Invalid command')
               break;
     }
});

const login = async () => {
     await client.login(token);
     return;
}

login();