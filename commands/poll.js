const pollEmbed = require('discord.js-poll-embed')

module.exports = {
    name: 'poll',
    description: 'Creates a poll. Use the format: ^poll name ...options...(max of 10) - timer(optional - default is 60 seconds - 0 for infinite)',
    async execute(message, args) {

        const title = args[0]
        let options = []
        let timeout = 60;

        for (let i = 1; i < args.length; i++) {
            timeout;
            let curr = args[i]
            if (curr === '-') {
                timeout = parseInt(args[i + 1])
                break;
            } else {
                options.push(curr)
            }
        }

        if (!timeout) {
            timeout = 60;
        }

        pollEmbed(message, title, options, timeout)
    }
}