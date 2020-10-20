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

        const author = await guild.members.cache.get(message.author.id)
        author.roles.add(teacherRole)

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
                { id: studentRole.id, deny: ['USE_VAD'] },
                { id: roles.everyone, deny: ['USE_VAD'] }
            ]
        })

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

        const discussion = await channels.create('discussion', {
            type: 'text',
            parent: teacherArea
        })

        const plans = await channels.create('planning', {
            type: 'text',
            parent: teacherArea
        })

        const teachResources = await channels.create('resources', {
            type: 'text',
            parent: teacherArea
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

        const resRepos = await channels.create('repos', {
            type: 'text',
            parent: resources
        })

        const hangout = await channels.create('Hangout', {
            type: 'category'
        })

        const chat = await channels.create('chat', {
            type: 'text',
            parent: hangout
        })

        const codeTalk = await channels.create('code-talk', {
            type: 'text',
            parent: hangout
        })

        const repoShare = await channels.create('repo-share', {
            type: 'text',
            parent: hangout
        })

        repoShare.send(`Bot's repo: https://github.com/sholt20/zoom-cord`)

        const memes = await channels.create('memes', {
            type: 'text',
            parent: hangout
        })

        const voiceChat = await channels.create('General', {
            type: 'voice',
            parent: hangout
        })

        const help = await channels.create('Help', {
            type: 'category'
        })

        const jsHelp = await channels.create('js-help', {
            type: 'text',
            parent: help
        })

        const pyHelp = await channels.create('py-help', {
            type: 'text',
            parent: help
        })

        const rubyHelp = await channels.create('ruby-help', {
            type: 'text',
            parent: help
        })

        const otherHelp = await channels.create('other-help', {
            type: 'text',
            parent: help
        })

        for (let i = 1; i < 4; i++) {
            channels.create(`Study Room ${i}`, {
                type: 'voice',
                parent: help
            })
        }


    }
}