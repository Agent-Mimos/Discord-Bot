const Discord = require('discord.js');
const bot = new Discord.Client({
    disableEveryone: true
});

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) return message.channel.send("**You don't have permissions**")
    if (!message.guild.me.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) return message.channel.send("**I don't have permissions**")

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!args[0]) return message.channel.send("**Please specify a user**")

    if (!member) return message.channel.send("**Can't seem to find this user**")

    if (!member.bannable) return message.channel.send("**This user can't be banned. It is either because they are a mod/admin, or their highest role is higher than mine**")

    if (member.id === message.author.id) return message.channel.send(`**You can't ban yourself**`)

    let reason = message.content.split(" ").slice(2).join(" ");

    if (reason === "") reason = 'Reason Unspecified';

    member.send(`**You have been banned on ${message.guild.name} for \`${reason}\`**`)

        .catch(err => {
            return;
        })

    await member.ban(reason)
        .catch(err => {
            if (err) return message.channel.send('**Something went wrong**')
        })

    const banembed = new Discord.MessageEmbed()

        .setTitle('Member Banned')
        .setThumbnail(member.user.displayAvatarURL({
            dynamic: true,
            format: 'png',
            size: 512
        }))
        .setColor("BLUE")
        .addField('User Banned:', `\u200b${member} (${member.id})`)
        .addField('Banned by:', `\u200b${message.author}`, true)
        .addField('Reason:', `\`\u200b${reason}\``, true)
        .addField("Ban Date:", message.createdAt.toLocaleString())
        .setTimestamp()
    message.channel.send(`**Successfully Banned ${member} for ${reason}**`).then(m => m.delete({
        timeout: 7000
    }))

    message.channel.send(banembed);
};

module.exports.config = {
    name: "ban",
    aliases: ["b", "banish", "remove", "hammer"],
    description: 'You can ban people'
}