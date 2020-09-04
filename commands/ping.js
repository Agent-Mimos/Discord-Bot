const Discord = require("discord.js");
const ms = require('ms');
const bot = new Discord.Client({
    disableEveryone: true
});

module.exports.run = async (bot, message, args) => {
    const msg = await message.channel.send(new Discord.MessageEmbed().setColor("#2F3136").setTitle("**🏓 Pinging...**"))
    const latency = msg.createdTimestamp - message.createdTimestamp;
    return msg.edit(new Discord.MessageEmbed().setColor("#2F3136").setTitle("**🏓 Pong!**").setDescription([
        `**⌛ Latency: \`${latency}ms\`**`,
        `**💓 API: \`${Math.round(bot.ws.ping)}ms\`**`
    ]))
};

module.exports.config = {
    name: "ping",
    aliases: ["latency"],
    description: 'Latency of the bot'
}