const Discord = require("discord.js");
const ms = require('ms');
const client = new Discord.Client({
    disableEveryone: true
});

module.exports.run = async (client, message, args) => {
    const msg = await message.channel.send("**Pinging...**")
    const latency = msg.createdTimestamp - message.createdTimestamp;
    return msg.edit(new Discord.MessageEmbed().setColor("#2F3136").setTitle("**🏓 Pong!**").setDescription([
        `**⌛ Latency: \`${latency}ms\`**`,
        `**💓 API: \`${Math.round(client.ws.ping)}ms\`**`
    ]))
};

module.exports.config = {
    name: "ping",
    aliases: ["latency"],
    description: 'Latency of the client'
}