const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    message.delete();

    const filterLevels = {
        DISABLED: 'Off',
        MEMBERS_WITHOUT_ROLES: 'No Role',
        ALL_MEMBERS: 'Everyone'
    };

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    let verificationLevels = {
        "NONE": "None",
        "LOW": "Low",
        "MEDIUM": "Medium",
        "HIGH": "High",
        "MAX": "Max"
    };

    let regions = {
        "brazil": "::flag_br: Brazil",
        "europe": ":flag_eu: Europe",
        "hong-kong": ":flag_hk: Hong kong",
        "india": ":flag_in: India",
        "japan": ":flag_jp: Japan",
        "russia": ":flag_ru",
        "singapore": ":flag_sa: Singapore",
        "south-africa": ":flag_za: South Africa",
        "sydney": ":flag_au: Sydney",
        "us-central": ":flag_us: US Central",
        "us-east": ":flag_us: US East",
        "us-south": ":flag_us: US South",
        "us-west": ":flag_us: US West"
    };

    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;

    const embed = new Discord.MessageEmbed()
        .setDescription(`**Server Information for __${message.guild.name}__**`)
        .setColor('BLUE')
        .setThumbnail(message.guild.iconURL({
            dynamic: true,
            format: 'png',
            size: 512
        }))
        .addField('General', [
            `**Name:** ${message.guild.name} (${message.guild.id})`,
            `**Owner:** 👑 ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
            `**Region:** ${regions[message.guild.region]}`,
            `**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'} <:boost:730867328417267742>`,
            `**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
            `**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
            `**Time Created:** ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).format('LT')} (${moment(message.guild.createdTimestamp).fromNow()})`,
        ])
        .addField('Statistics', [
            `**Role Count:** ${roles.length}`,
            `**Emoji Count:** ${emojis.size}`,
            `**Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
            `**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
            `**Member Count:** ${message.guild.memberCount}`,
            `**Humans:** ${members.filter(member => !member.user.bot).size}`,
            `**Bots:** ${members.filter(member => member.user.bot).size}`,
            `**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
            `**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
            `**Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
        ])
        .addField('Presence', [
            `**:green_circle: Online:** ${members.filter(member => member.presence.status === 'online').size}`,
            `**:yellow_circle: Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
            `**:red_circle: Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
            `**:white_circle: Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
        ])
        .setTimestamp()
    message.channel.send(embed);
}

module.exports.config = {
    name: "serverinfo",
    aliases: [],
    description: 'Shows the servers info'
}