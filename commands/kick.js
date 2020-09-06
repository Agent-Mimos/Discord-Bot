const Discord = require('discord.js');
const bot = new Discord.Client({
    disableEveryone: true
});

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("**⛔ You don't have permissions**"))
    if (!message.guild.me.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("**⛔ I don't have permissions**"))

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("**⛔ Please specify a user**"))

    if (!member) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("**⛔ Can't seem to find this user**"))

    if (!member.kickable) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("**⛔ This user can't be kicked. It is either because they are a mod/admin, or their highest role is higher than mine**"))

    if (member.id === message.author.id) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`⛔ You can't kcik yourself`))

    let reason = message.content.split(" ").slice(2).join(" ");

    if (reason === "") reason = 'Reason Unspecified';

    member.kick({
        reason: `${reason}`,
    }).catch(error => {
        console.log(error)
        if (error) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription('⛔ Something went wrong'))
    })


    const kickembed = new Discord.MessageEmbed()
        .setTitle(`Member Kicked | ${member.user.tag}`)
        .setColor("BLUE")
        .setThumbnail(member.user.displayAvatarURL())
        .addField('**User Kicked:**', `\u200b${member}`, true)
        .addField('**Kicked by:**', `\u200b${message.author}`, true)
        .addField('**Reason:**', `\`\u200b${reason}\``, true)
        .addField("**Date:**", message.createdAt.toLocaleString())
        .setTimestamp()
    message.channel.send(`**:white_check_mark: | Successfully Kicked ${member} for ${reason}**`).then(m => m.delete({
        timeout: 7000
    }));
    message.channel.send(kickembed);

    member.send(new Discord.MessageEmbed().setColor("BLUE").setDescription(`**You have been kicked from ${message.guild.name} for \`${reason}\`**`)).catch(error => {
        return;
    })
}


module.exports.config = {
    name: "kick",
    aliases: [],
    description: 'You can ban people'
}