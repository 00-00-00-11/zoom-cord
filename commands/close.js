async function deleteChannel(channels, name) {
    const fetchedChannel = await channels.cache.find(channel => channel.name === name)
    if (fetchedChannel.name.includes('room') && fetchedChannel.type !== 'category') {
        fetchedChannel.delete()
    }
}

async function moveUsers(channels, channel) {
    const main = await channels.cache.find(c => c.name === 'Main')
    for (member of channel.members) {
        async function mover() {
            if (member.voice.channelID) {
                await member.voice.setChannel(main)
            }
        }
        mover()
    }
}

module.exports = {
    name: 'close',
    description: 'Delete pair rooms and roles',
    async execute(message) {
        const channels = message.guild.channels
        const roles = message.guild.roles
        console.log(channels.cache)

        await Promise.all(channels.cache.map(channel => {
            console.log(channel)
        }))
        // message.guild.channels.cache.forEach(channel => {

            // async function moveDeleteWrap() {
            //     async function moveWrapper() {
            //         await moveUsers(channels, channel)
            //     }
            //     await moveWrapper()

            //     async function deleteWrapper() {
            //         await deleteChannel(channels, channel.name)
            //     }
            //     await deleteWrapper()
            // }
            // moveDeleteWrap()
            // async function moveAndDelete() {
            //     const main = await channels.cache.find(c => c.name === 'Main')
            //     await channel.members.forEach(member => {
            //         async function mover() {
            //             if (member.voice.channelID) {
            //                 await member.voice.setChannel(main)
            //             }
            //         }
            //         mover()
            //     })
            //     await deleteChannel(channels, channel.name)
            // }

            // moveAndDelete()

        message.guild.roles.cache.forEach(role => {
            async function deleteRole(role, name) {
                const fetchedRole = await roles.cache.find(role => role.name === name)
                if (fetchedRole.name.startsWith('Pair')) {
                    fetchedRole.delete()
                }
            }
            deleteRole(role, role.name)
        })
    }
}