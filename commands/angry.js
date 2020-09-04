module.exports = {
     name: 'angry',
     description: 'ping the user who issued the command',
     execute(message, args) {
          message.channel.send(`<@${message.author.id}> don't touch me.`);
     }
}