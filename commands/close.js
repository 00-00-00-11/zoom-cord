module.exports = {
    name: 'close',
    description: 'Delete pair rooms and roles',
    async execute(message) {
        message.guild.channels.cache.forEach(channel => {
            async function deleteChannel(channel, name) {
                const fetchedChannel = await message.guild.channels.cache.find(channel => channel.name === name)
                if (fetchedChannel.name.startsWith('Pairing room')) {
                    fetchedChannel.delete()
                }
            }
            deleteChannel(channel, channel.name)
        })
        message.guild.roles.cache.forEach(role => {
            async function deleteRole(role, name) {
                const fetchedRole = await message.guild.roles.cache.find(role => role.name === name)
                if (fetchedRole.name.startsWith('Pair')) {
                    fetchedRole.delete()
                }
            }
            deleteRole(role, role.name)
        })
    }
}