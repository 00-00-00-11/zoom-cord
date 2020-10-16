module.exports = {
    name: 'setup',
    description: 'Initial server setup for a/A cohorts',
    async execute(message, args) {
        const setupCheck = message.guild.channels.cache.find(c => c.name.toLowerCase() === 'classroom' && c.type === 'category')

        if (setupCheck) {
            message.channel.send('Server has already been set up')
            return
        }

        const guild = message.guild
        const channels = guild.channels
        const roles = guild.roles

        const teacherRole = await roles.create({ data: { name: 'Teacher', permissions: ['ADMINISTRATOR', 'PRIORITY_SPEAKER']}})
        const studentRole = await roles.create({ data: { name: 'Student'}})

        const classroom = await channels.create('Classroom', {
            type: 'category'
        })

        const questionsChat = await channels.create('questions', {
            type: 'text',
            parent: classroom
        })

        const mainChat = await channels.create('class-chat', {
            type: 'text',
            parent: classroom
        })

        const mainRoom = await channels.create('Main', {
            type: 'voice',
            parent: classroom,
            permissionOverwrites: [
                {
                    id: studentRole.id,
                    deny: ['USE_VAD']
                }
            ]
        })

        const author = await guild.members.cache.get(message.author.id)
        author.roles.add(teacherRole)
    }
}