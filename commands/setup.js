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

        async function createChannel(classObj) {
            await channels.create(classObj.name, {
                type: classObj.type,
                parent: classObj.parent || null,
                permissionOverwrites: classObj.perms || null
            })
        }

        const author = await guild.members.cache.get(message.author.id)
        author.roles.add(teacherRole)

        const classroom = await channels.create('Classroom', {
            type: 'category'
        })

        const classroomChildren = [
            { name: 'questions', type: 'text', parent: classroom },
            { name: 'class-chat', type: 'text', parent: classroom },
            { name: 'Main', type: 'voice', parent: classroom, perms: [{ id: studentRole.id, deny: ['USE_VAD'] }, { id: roles.everyone, deny: ['USE_VAD']} ]},
            { name: 'bot-commands', type: 'text', parent: classroom}
        ]

        classroomChildren.forEach(child => createChannel(child))

        channels.cache.forEach(channel => {
            if (channel.parent != classroom && channel != classroom) {
                channel.delete()
            }
        })

        const teacherArea = await channels.create('Teacher Area', {
            type: 'category',
            permissionOverwrites: [
                {id: studentRole.id, deny: ['VIEW_CHANNEL']},
                {id: roles.everyone, deny: ['VIEW_CHANNEL']},
                {id: teacherRole.id, allow: ['VIEW_CHANNEL']}
            ]
        })

        const resources = await channels.create('Resources', {
            type: 'category',
            permissionOverwrites: [
                { id: studentRole.id, deny: ['SEND_MESSAGES'] },
                { id: roles.everyone, deny: ['SEND_MESSAGES'] },
                { id: teacherRole.id, allow: ['SEND_MESSAGES'] }
            ]
        })

        const hangout = await channels.create('Hangout', {
            type: 'category'
        })

        const help = await channels.create('Help', {
            type: 'category'
        })

        const childChannels = [
            { name: 'discussion', type: 'text', parent: teacherArea },
            { name: 'planning', type: 'text', parent: teacherArea },
            { name: 'resources', type: 'text', parent: teacherArea },
            { name: 'Teacher Talk', type: 'voice', parent: teacherArea },
            { name: 'announcements', type: 'text', parent: resources },
            { name: 'files', type: 'text', parent: resources },
            { name: 'videos-and-articles', type: 'text', parent: resources },
            { name: 'files', type: 'text', parent: resources },
            { name: 'repos', type: 'text', parent: resources },
            { name: 'chat', type: 'text', parent: hangout },
            { name: 'code-talk', type: 'text', parent: hangout },
            { name: 'repo-share', type: 'text', parent: hangout },
            { name: 'memes', type: 'text', parent: hangout },
            { name: 'General', type: 'voice', parent: hangout },
            { name: 'js-help', type: 'text', parent: help },
            { name: 'py-help', type: 'text', parent: help },
            { name: 'ruby-help', type: 'text', parent: help },
            { name: 'other-help', type: 'text', parent: help },
        ]

        childChannels.forEach(child => createChannel(child))


        for (let i = 1; i < 4; i++) {
            await channels.create(`Study Room ${i}`, {
                type: 'voice',
                parent: help
            })
        }

        const repoShare = await channels.cache.find(c => c.name.toLowerCase() === 'repo-share')
        repoShare.send(`Bot's repo: https://github.com/Cthulhuhub/zoom-cord`)

    }
}