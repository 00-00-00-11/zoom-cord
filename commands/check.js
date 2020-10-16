const { execute } = require("./setup");

module.exports = {
    name: 'check',
    description: 'Check vc channel users',
    async execute(message, args) {
        const channels = message.guild.channels
        const gen = await channels.cache.find(c => c.name.toLowerCase() === 'general' && c.type === 'voice')
        const tester = await channels.cache.find(c => c.name.toLowerCase() === 'move-me')
        gen.members.forEach(user => {
            console.log(user.voice.setChannel(tester))
        })
    }
}