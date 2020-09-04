module.exports = {
     name: 'ping',
     description: 'generic test command',
     execute(message, args) {
          message.channel.send('pong!');
     }
}