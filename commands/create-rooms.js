module.exports = {
     name: 'create-rooms',
     description: 'Generate 2 person breakout voice channels',
     async execute(message, args) {
          let pairs = [];
          for (let i = 0; i < args.length; i += 2) {
               if (args[i] === undefined) return;
               let p1 = args[i];
               let p2 = args[i + 1];
               pairs.push([p1, p2]);
          }
          pairs.forEach((pair, i) => {
               message.guild.channels.create(`Pairing room ${i}`, {
                    type: 'voice'
               });
          });
     }
}