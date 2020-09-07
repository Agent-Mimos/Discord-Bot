const Discord = require('discord.js');
const bot = new Discord.Client({
    disableEveryone: true
});

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

    let gaymeter = Math.floor(Math.random() * 100) + 5

    const embed = new Discord.MessageEmbed()
        .setTitle('Gay Machine')
        .setColor("RANDOM")
        .setDescription([
            `**${user}, You are ${gaymeter}% Gay :rainbow_flag:**`
        ])
    message.channel.send(embed)
}


module.exports.config = {
    name: "howgay",
    aliases: ["gaymeter", "gay"],
    description: ''
}