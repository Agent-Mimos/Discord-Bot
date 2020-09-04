const Discord = require("discord.js");
const {
    token,
    prefix
} = require("./config.json");
const time = require('moment-timezone');
const moment = require("moment");
const fs = require("fs");
const client = new Discord.Client({
    disableEveryone: true
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(` ✅ ${f} is succesfully loaded.`);
        client.commands.set(props.config.name, props);
        let pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name)
        });
    });
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading ${eventName} event.`);
        client.on(eventName, event.bind(null, client));
    });
});

client.on("message", async message => {
    if (message.author.client || message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;

    try {
        let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
        if (commandfile) commandfile.run(client, message, args);
        if (!commandfile) return;
        console.log("[" + moment.tz("America/New_York").format('HH:mm A') + `\u001b[0m` + "]" + ` Server: ${message.guild.name} | Channel: #${message.channel.name} | ${message.author.tag} used ${cmd}`)
    } catch (err) {
        return message.channel.send("**Something is going on.**");
    }
});

client.on("guildMemberAdd", async member => {
    const welcome = member.guild.channels.cache.find(channel => channel.name === 'welcome');
    if (!welcome) return;
    welcome.send(`Welcome **${member} To **${member.guild.name}**`);

    member.send(`**${member} Have a great time in ${member.guild.name} :wave:**`)
        .catch(err => {
            return;
        })
});

client.on("guildMemberRemove", async member => {
    const welcome = member.guild.channels.cache.find(channel => channel.name === 'welcome');
    if (!welcome) return;
    welcome.send(`**${member.user.tag} has left ${member.guild.name} :wave:**`)
});

client.login(token)