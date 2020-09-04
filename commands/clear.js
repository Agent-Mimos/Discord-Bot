const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    message.delete();

    if (message.deletable) {
        message.delete();
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("**You don't have permissions to use this command**").then(m => m.delete(5000));
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.channel.send("**You can't delete 0 messages**").then(m => m.delete(5000));
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("**I don't have permissions to delete messages**").then(m => m.delete(5000));
    }

    if (arg[0] > 100) return message.channel.send('**You can`t delete more than 100 messages at once**').then(m => m.delete(5000));

    let deleteAmount;

    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }

    try {
        await message.channel.bulkDelete(deleteAmount, true);
    } catch (e) {
        return message.channel.send('**You can`t delete more than 100 messages at once**').then(m => m.delete({
            timeout: 7000
        }));
    }
    message.channel.send(`**Successfully Deleted \`${args[0]}\` messages!**`).then(m => m.delete({
        timeout: 7000
    }));
};

module.exports.config = {
    name: "clear",
    aliases: ["purge"],
    description: 'Clean Messages'
};