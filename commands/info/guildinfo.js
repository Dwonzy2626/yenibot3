const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const DatabaseUtils = require('./../../Utils/DatabaseUtils.js');

module.exports = {
   name: 'guildinfo',
   aliases: ['info', 'guildinfo', 'gi'],
   category: 'info',
   enabled: true,
   requiresdatabase: true,
   description: 'Returns information about your guild.',
   usage: '[command | alias]',
   run: async (client, message, args) => {
      return message.channel.send(new MessageEmbed()
         .setThumbnail('https://imgur.com/Or3WRee.gif')
         .setTitle(`${message.guild.name}'s info`)
         .addFields(
            { name: "Servers I'm in", value: client.guilds.cache.array().length, inline: true },
            { name: "This Server's Members", value: message.guild.members.cache.array().length, inline: true },
            { name: 'Guild ID', value: message.guild.id, inline: true }
         )
         .setColor('#BBA2F7')
         .setFooter('Command executed by: ' + message.author.username, message.author.avatarURL())
         .setTimestamp()
      )
   }
} 