const { MessageEmbed } = require('discord.js');

module.exports = {
   name: 'ping',
   aliases: ['latency'],
   description: 'Returns bot ping and user ping.',
   category: 'info',
   enabled: true,
   run: async (client, message, args) => {
      message.channel.send('Pong! Calculating my ping...').then(message2 => {
         var ping = Math.round(Date.now() - message2.createdTimestamp) + 'ms';
         const embed = new MessageEmbed()
            .setColor('#dcc3ff')
            .setTitle('Ping Calculator')
            .addFields(
               { name: 'My ping (Latency)', value: Math.round(client.ws.ping) + 'ms' },
               { name: 'Your ping', value: ping },
            )
            .setTimestamp()
            .setFooter('Command executed by: ' + message.author.username, message.author.avatarURL());

         message2.edit('', embed);
      }).catch(() => message2.edit('', 'Error occurred calculating ping'));
   }
}
