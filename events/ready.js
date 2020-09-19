const Discord = require("discord.js");
const {
    prefix
} = require('../config.json');
const client = new Discord.Client({
    disableEveryone: true
});

module.exports = async (client) => {
    console.log(`${client.user.tag} is up and running. | ${client.guilds.cache.size.toLocaleString()} servers | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`);
    let statuses = [
        `over ${client.guilds.cache.size.toLocaleString()} servers`,
        `${prefix}help`,
        `over ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`,
        `✨ The Developer Agent Mimos#0001 ✨`
    ]
    setInterval(function () {
        let statuse = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setPresence({
                activity: {
                    name: `${statuse}`,
                    type: 'WATCHING',
                },
                status: 'dnd'
            })
            .catch(console.error);
    }, 10000)
};