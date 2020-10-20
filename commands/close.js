function deleteChannel(channels, name) {
    const fetchedChannel = channels.cache.find(channel => channel.name === name)
    if (fetchedChannel.name.includes('room') && fetchedChannel.type !== 'category' || fetchedChannel.name.startsWith('pair-chat')) {
        fetchedChannel.delete()
    }
}
module.exports = {
    name: 'close',
    description: 'Delete pair rooms and roles (does not move users back to main room)',
    async execute(message) {

        const channels = message.guild.channels
        const roles = message.guild.roles

        const teacherRole = roles.cache.find(r => r.name.toLowerCase() === 'teacher')

        if (!message.member.roles.cache.has(teacherRole.id)) {
             message.channel.send('Only teachers can use this command')
             return;
        }

        channels.cache.forEach(channel => deleteChannel(channels, channel.name))

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