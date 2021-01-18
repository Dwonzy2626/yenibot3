const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
   name: 'meme',
   category: 'fun',
   description: 'Sends an epic meme',
   enabled: true,
   run: async (client, message, args) => {
      const subReddits = ['dankmeme', 'meme', 'me_irl'];
      const random = subReddits[Math.floor(Math.random() * subReddits.length)];

      // Grab random puppy from subreddit picked above 
      const img = await randomPuppy(random);

      message.channel.send(new MessageEmbed()
         .setColor('#BBA2F7')
         .setImage(img)
         .setTitle(`From /r/${random}`)
         .setURL(`https://reddit.com/r/${random}`)
      );
   }
}