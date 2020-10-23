const Discord = require('discord.js')
const ms = require('ms')

function getRando() {
    let min = 1;
    let max = 4;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

function determineWinner(a, b, c , d) {
    const maxLength = Math.max(a.length, b.length, c.length, d.length)
    if (a.length === maxLength) {
        return a[a.length - 1]
    } else if (b.length === maxLength) {
        return b[b.length - 1]
    } else if (c.length === maxLength) {
        return c[c.length - 1]
    } else if (d.length === maxLength) {
        return d[d.length - 1]
    }
}

function updaterFunc(original, update) {
    original.edit(update)
}


module.exports = {
    name: 'countdown',
    description: 'a countdown timer. Format command as such ^countdown time emoji1 emoji2 emoji3 emoji4 (emojis are optional)',
    async execute(message, args) {

        const guild = message.guild
        const roles = guild.roles

        const studentRole = roles.cache.find(r => r.name.toLowerCase() === 'student')

        const time = args[0]
        const emoji1 = [args[1]]
        const emoji2 = [args[2]]
        const emoji3 = [args[3]]
        const emoji4 = [args[4]]
        const mstime = ms(time)
        let timeLeft = time
        let winner = 'None yet!'

        if (!mstime) {
            message.channel.send('Please provide a valid time, such as 30s or 5m')
            return
        }

        const attachment = new Discord.MessageAttachment('./commands/images/Appacademylogo.png', 'aa.png')

        const timerEmbed = new Discord.MessageEmbed()
            .setColor('#ff5733')
            .setTitle('Timer')
            .setAuthor(`${message.author.username}`)
            .setDescription(`
                ${emoji1.join('') || ''}
                ${emoji2.join('') || ''}
                ${emoji3.join('') || ''}
                ${emoji4.join('') || ''}`
            )
            .attachFiles(attachment)
            .setThumbnail('attachment://aa.png')
            .addFields(
                { name: 'Total time', value: `${msToTime(mstime)}`, inline: true},
                { name: 'Time remaining', value: `${msToTime(mstime)}`, inline: true},
                { name: 'Winner', value: `${winner}`, inline: true }
            )

        const embed = await message.channel.send(timerEmbed)

        setTimeout(() => {
            message.channel.send(`Time is up! Come back ${studentRole}`)
            clearInterval(updater)
            winner = determineWinner(emoji1, emoji2, emoji3, emoji4)
            const update = embedGen(count + 5, winner)
            updaterFunc(embed, update)
        }, mstime)

        function embedGen(count, winner) {

            const num = getRando()
            if (num === 1 && emoji1[0]) {
                emoji1.unshift('=')
            } else if (num === 2 && emoji2[0]) {
                emoji2.unshift('=')
            } else if (num === 3 && emoji3[0]) {
                emoji3.unshift('=')
            } else if (num === 4 && emoji4[0]) {
                emoji4.unshift('=')
            }

            const embedUpdate = new Discord.MessageEmbed()
                .setColor('#ff5733')
                .setTitle('Timer')
                .setAuthor(`${message.author.username}`)
                .setDescription(`
                    ${emoji1.join('') || ''}
                    ${emoji2.join('') || ''}
                    ${emoji3.join('') || ''}
                    ${emoji4.join('') || ''}`
                )
                .attachFiles(attachment)
                .setThumbnail('attachment://aa.png')
                .addFields(
                    { name: 'Total time', value: `${msToTime(mstime)}`, inline: true},
                    { name: 'Time remaining', value: `${msToTime(ms(timeLeft) - (count * 1000))}`, inline: true},
                    { name: 'Winner', value: `${winner}`, inline: true }
                )

                return embedUpdate
        }



        let count = 0
        const updater = setInterval(async () => {
            count+=5
            const update = embedGen(count, winner)
            updaterFunc(embed, update)
        }, 5000)
    }

}