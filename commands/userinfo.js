const Discord = require("discord.js");
const dateFormat = require('dateformat')
const moment = require('moment');
const bot = new Discord.Client({
    disableEveryone: true
});

module.exports.run = async (bot, message, args, functions) => {
    const userToCheck = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const statuses = {
        "online": ":green_circle: Online",
        "offline": ":white_circle: Offline",
        "idle": ":yellow_circle: Idle",
        "dnd": ":red_circle: Do Not Disturb"
    }
    
    let y = Date.now() - message.guild.members.cache.get(userToCheck.id).joinedAt;
    const joined = Math.floor(y / 86400000);

    const joineddate = moment.utc(userToCheck.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");

    const roles = userToCheck.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);

    const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setThumbnail(userToCheck.user.displayAvatarURL({
            dynamic: true,
            format: 'png',
            size: 512
        }))
        .setAuthor(`${userToCheck.user.tag} Info`, userToCheck.user.displayAvatarURL())
        .setDescription([
            `**Username** ${userToCheck.user.username}`,
            `**Discriminator:** ${userToCheck.user.discriminator}`,
            `**ID:** ${userToCheck.user.id}`,
            `**Account Created:** ${dateFormat(userToCheck.user.createdAt, "dd/mm/yyyy - HH:MM:ss")}`,
            `**Status:** ${statuses[userToCheck.user.presence.status]}`,
            `**Games:** ${userToCheck.user.presence.activities || 'Not playing any game'}`,
            `**Roles:** \n<@&${userToCheck._roles.join('> <@&')}>`,
            `**Joined Server:** ${joineddate} \n> ${joined} day(s) Ago`,
        ])
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`, bot.user.displayAvatarURL())

    return message.channel.send(embed);
};

module.exports.config = {
    name: "userinfo",
    aliases: ["info"],
    description: ''
}