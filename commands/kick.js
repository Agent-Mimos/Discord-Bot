const Discord = require('discord.js');
const bot = new Discord.Client({
    disableEveryone: true
});

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.channel.send("**You don't have permissions**")
    if (!message.guild.me.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.channel.send("**I don't have permissions**")

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!args[0]) return message.channel.send("**Please specify a user**")

    if (!member) return message.channel.send("**Can't seem to find this user**")

    if (!member.kickable) return message.channel.send("**This user can't be kicked. It is either because they are a mod/admin, or their highest role is higher than mine**")

    if (member.id === message.author.id) return message.channel.send(`**You can't kick yourself**`)

    let reason = message.content.split(" ").slice(2).join(" ");

    if (reason === "") reason = 'Reason Unspecified';

    member.send(`**You have been kicked from ${message.guild.name} for \`${reason}\`**`)

    await member.kick(reason)
        .catch(err => {
            if (err) return message.channel.send('**Something went wrong**')
        })

    const kickembed = new Discord.MessageEmbed()
        .setTitle(`Member Kicked | ${member.user.tag}`)
        .setColor("BLUE")
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Kicked:', `\u200b${member}`, true)
        .addField('Kicked by:', `\u200b${message.author}`, true)
        .addField('Reason:', `\`\u200b${reason}\``, true)
        .addField('Date:', message.createdAt.toLocaleString())
        .setTimestamp()
    message.channel.send(`**Successfully Kicked ${member} for ${reason}**`).then(m => m.delete({
        timeout: 7000
    }));
    message.channel.send(kickembed);
}


module.exports.config = {
    name: "kick",
    aliases: [],
    description: 'You can ban people'
}