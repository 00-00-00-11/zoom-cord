module.exports = {
     name: 'breakout',
     description: 'Generate 2 person breakout voice channels',
     async execute(message, args) {
          let pairs = [];
          for (let i = 0; i < args.length; i += 2) {
               let student1 = await message.guild.members.cache.get(args[i].substring(3, 21));
               if (!args[i + 1]) {
                    pairs.push([student1])
               } else {
                    let student2 = await message.guild.members.cache.get(args[i + 1].substring(3, 21));
                    pairs.push([student1, student2]);
               }
          }
          pairs.forEach( async (pair, i) => {
               i++
               const pairRole = await message.guild.roles.create({ data: {name: `Pair ${i}`}})
               const pairRoom = await message.guild.channels.create(`Pairing room ${i}`, {
                    type: 'voice'
               });
               pair.forEach(async person => {
                    person.roles.add(pairRole);
               });

               pairRoom.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
               pairRoom.updateOverwrite(pairRole, { VIEW_CHANNEL: true });

          });
     }
}