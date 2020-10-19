module.exports = {
     name: 'breakout',
     description: 'Generate 2 person breakout voice channels',
     async execute(message, args, prefix) {

          const guild = message.guild
          const channels = guild.channels
          const roles = guild.roles
          const members = guild.members

          const classroom = channels.cache.find(c => c.name.toLowerCase() === 'classroom' && c.type === 'category')
          if (!classroom) {
               message.channel.send('Please run the setup command first, or create a category called Classroom')
               return
          }
          let closed = true;
          channels.cache.forEach(channel => {
               if (channel.name.startsWith('Pairing room')) {
                    closed = false;
               }
          })

          if (!closed) {
               message.channel.send(`Please close rooms (you can use ${prefix}close) before opening more`)
               return
          }
          let pairs = [];
          for (let i = 0; i < args.length; i += 2) {
               let student1 = await members.cache.get(args[i].substring(3, 21));
               if (!args[i + 1]) {
                    pairs.push([student1])
               } else {
                    let student2 = await members.cache.get(args[i + 1].substring(3, 21));
                    pairs.push([student1, student2]);
               }
          }
          pairs.forEach( async (pair, i) => {
               i++
               const pairRole = await roles.create({ data: {name: `Pair ${i}`}})
               const pairRoom = await channels.create(`Pairing room ${i}`, {
                    type: 'voice',
                    parent: classroom
               });

               const pairChat = await channels.create(`Pair chat ${i}`, {
                    type: 'text',
                    parent: classroom
               });

               pairRoom.updateOverwrite(roles.everyone, { VIEW_CHANNEL: false });
               pairRoom.updateOverwrite(pairRole, { VIEW_CHANNEL: true });
               pairChat.updateOverwrite(roles.everyone, { VIEW_CHANNEL: false })
               pairChat.updateOverwrite(pairRole, { VIEW_CHANNEL: true })

               pair.forEach(async person => {
                    person.roles.add(pairRole);
                    person.voice.setChannel(pairRoom)
               });
          });
     }
}