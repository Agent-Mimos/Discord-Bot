const Discord = require("discord.js");
const {
    prefix
} = require('../config.json');
const bot = new Discord.Client({
    disableEveryone: true
});

module.exports = async (bot) => {
    console.log(`${bot.user.tag} is up and running. | ${bot.guilds.cache.size.toLocaleString()} servers | ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`);
    let statuses = [
        `over ${bot.guilds.cache.size.toLocaleString()} servers`,
        `${prefix}help`,
        `over ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`,
        `✨ The Developer Agent Mimos#0001 ✨`
    ]
    setInterval(function () {
        let statuse = statuses[Math.floor(Math.random() * statuses.length)]
        bot.user.setPresence({
                activity: {
                    name: `${statuse}`,
                    type: 'WATCHING',
                },
                status: 'dnd'
            })
            .catch(console.error);
    }, 10000)
};