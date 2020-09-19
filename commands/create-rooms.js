module.exports = {
     name: 'breakout',
     description: 'Generate 2 person breakout voice channels',
     async execute(message, args) {
          let pairs = [];
          for (let i = 0; i < args.length; i += 2) {
               if (!args[i]) return;
               let parsed1 = parseInt(args[i].substring(3, 21), 10);
               let student1 = await message.guild.members.fetch(parsed1);
               let student2;
               if (args[i + 1]) {
                    let parsed2 = parseInt(args[i + 1].substring(3, 21), 10);
                    student2 = await message.guild.members.fetch(parsed2);
               }
               pairs.push([student1, student2]);
          }
          pairs.forEach( async (pair, i) => {
               i++;
               console.log(pair);
               const newRole = await message.guild.roles.create({ data: {name: `Pair ${i}`}})
               const pairRoom = await message.guild.channels.create(`Pairing room ${i}`, {
                    type: 'voice'
               });
               const roleId = parseInt(newRole.id, 10);
               const pairRole = await message.guild.roles.fetch(roleId);
               pairRoom.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
               pairRoom.updateOverwrite(message.guild.roles.fetch(roleId), { VIEW_CHANNEL: true });
          });
     }
}