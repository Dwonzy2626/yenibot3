const { MessageEmbed } = require('discord.js');

module.exports = {
   name: 'avatar',
   aliases: ['av'],
   description: 'returns users avatar',
   category: 'info',
   enabled: true,
   run: async (client, message, args) => {

      let mentioned = message.mentions.users.array();

      if (args.length == 0) {

         const embed = new MessageEmbed()
            .setColor('#BBA2F7')
            .setImage(message.author.displayAvatarURL({ size: 1024, dynamic: true })) // appears gif dynamically.
            .setAuthor(message.author.username)

         message.channel.send(embed);
      } else if (args.length == 1) {
         if (mentioned.length == 1) {

            message.guild.members.fetch(mentioned[0].id).then(gmem => {


               const embed = new MessageEmbed()
                  .setColor('#BBA2F7')
                  .setAuthor(mentioned[0].username)
                  .setImage(mentioned[0].displayAvatarURL({ size: 1024, dynamic: true })) // appears gif dynamically.

               message.channel.send(embed);
            });
         } else {
            message.guild.members.fetch(args[0]).then(gmem => {
               let gmemuser = gmem.user;

               const embed = new MessageEmbed()
                  .setImage(gmemuser.displayAvatarURL({ size: 1024, dynamic: true }))
                  .setColor('#BBA2F7')
                  .setAuthor(gmemuser.username)

               message.channel.send(embed);
            }).catch(err => {
               message.channel.send('Invalid user ID.');
            });
         }
      } else {
         message.channel.send('Too many arguments!');
      }
   }
}