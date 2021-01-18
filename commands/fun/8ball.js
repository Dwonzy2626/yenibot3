const { MessageEmbed } = require('discord.js');

module.exports = {
   name: '8ball',
   description: 'randomly gives you chance of something',
   category: 'fun',
   run: async (client, message, args) => {
      let question = message.content.slice(client.prefix.length + 6);
      if (!question) return message.channel.send(`what's your question?`);

      let responses = [
         'yep',
         'no ):',
         'definitely!',
         'absolutely',
         'not in a million years.'
      ];

      let response = responses[Math.floor(Math.random() * responses.length)];

      message.channel.send(new MessageEmbed()
         .setTitle('`🥥` 8 ball')
         .setColor('#a27b9d')
         .setThumbnail(client.user.displayAvatarURL())
         .addField(`${message.author.username}'s question:`, question)
         .addField('bot\'s reply:', response)
      )
   }
};
