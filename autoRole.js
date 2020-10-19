module.exports = client => {
    client.on('guildMemberAdd', async member => {
        const studentRole = await member.guild.roles.cache.find(role => role.name.toLowerCase() === 'student')
        member.roles.add(studentRole)
    })
}