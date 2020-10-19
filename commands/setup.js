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

        const teacherRole = await roles.create({ data: { name: 'Teacher', permissions: ['ADMINISTRATOR', 'PRIORITY_SPEAKER'], hoist: true }})
        const studentRole = await roles.create({ data: { name: 'Student' }})

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

        channels.cache.forEach(channel => {
            if (channel.parent != classroom && channel != classroom) {
                channel.delete()
            }
        })

        const resources = await channels.create('Resources', {
            type: 'category',
            permissionOverwrites: [
                { id: studentRole.id, deny: ['SEND_MESSAGES'] },
                { id: roles.everyone, deny: ['SEND_MESSAGES'] },
                { id: teacherRole.id, allow: ['SEND_MESSAGES'] }
            ]
        })

        const announcements = await channels.create('announcements', {
            type: 'text',
            parent: resources
        })

        const files = await channels.create('files', {
            type: 'text',
            parent: resources
        })

        const vidsArts = await channels.create('videos-and-articles', {
            type: 'text',
            parent: resources
        })

        const author = await guild.members.cache.get(message.author.id)
        author.roles.add(teacherRole)
    }
}