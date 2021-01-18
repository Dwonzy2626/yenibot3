// invite to amour discord.gg/HQQe4Tu
const { MessageEmbed } = require('discord.js')

module.exports = {
   name: 'support',
   aliases: ['error'],
   description: 'gets link to amourbot support server',
   category: 'info',
   enabled: true,
   run: async (client, message, args) => {
      message.channel.send(new MessageEmbed()
         .setTitle('Need help?')
         .setDescription('Join the support server with the invite https://discord.gg/g4p6UMj')
         .setColor(0xBBA2F7)
         .setFooter('Developed by bea#0001')
      )
   }
}