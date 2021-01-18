const { MessageEmbed } = require('discord.js'); // messageembed is a discord js feature, therefore we require the npm package.

module.exports = {
   name: 'coinflip',
   description: 'flips a coin and randomly generates either heads or tails.',
   aliases: ['cf'],
   category: 'fun', // module exports for command details.
   run: async (client, message, args) => {
      let chances = [ // chances gets randomized.
         'heads!',
         'tails!'
      ];

      let response = chances[Math.floor(Math.random() * chances.length)]; // the randomization function for the two chances.

      message.channel.send(new MessageEmbed()
         .setTitle('`☁️` coin flip')
         .setDescription(`you landed on ${response}`)
         .setFooter(`message executed by ${message.author.username}`)
         .setColor('#daffff')
         .setThumbnail('https://i.pinimg.com/originals/c1/2d/c5/c12dc536b8f8797b629eb9942a2dbbf1.gif')
      )

   }
};
