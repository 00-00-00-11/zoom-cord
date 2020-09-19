module.exports = {
     name: 'breakout',
     description: 'Generate 2 person breakout voice channels',
     async execute(message, args) {
          let pairs = [];
          for (let i = 0; i < args.length; i += 2) {
               let parsed1 = parseInt(args[i].substring(3, 21), 10);
               let student1 = await message.guild.members.fetch(parsed1);
               if (!args[i + 1]) {
                    pairs.push([student1])
               } else {
                    let parsed2 = parseInt(args[i + 1].substring(3, 21), 10);
                    let student2 = await message.guild.members.fetch(parsed2);
                    pairs.push([student1, student2]);
               }
          }

          let count = 1;
          pairs.forEach( async (pair, i) => {
               const pairRole = await message.guild.roles.create({ data: {name: `Pair ${count}`}})
               const pairRoom = await message.guild.channels.create(`Pairing room ${count}`, {
                    type: 'voice'
               });
               pair.forEach(async person => {
                    const currUser = await message.guild.members.fetch(person.first().id);
                    currUser.roles.add(pairRole);
               });


               pairRoom.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
               pairRoom.updateOverwrite(pairRole, { VIEW_CHANNEL: true });
               count++;
          });
     }
}