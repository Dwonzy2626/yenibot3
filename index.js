require('dotenv').config();

const { Client, Collection } = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');

const client = new Client({
   disableMentions: 'everyone'
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');
client.prefix = ';;';

client.on('rateLimit', (...args) => console.log('[RATELIMIT]', ...args));

client.on('warn', (...args) => console.warn('[WARN]', ...args));

client.on('ready', async () => {
   const activities = ['hello!', "quantumbot's github"];

   let activity = activities[Math.floor(Math.random() * activities.length)];
   client.user.setActivity(activity, { type: 'WATCHING' });

   setInterval(() => {
      let activity = activities[Math.floor(Math.random() * activities.length)];
      client.user.setActivity(activity, { type: 'WATCHING' });
   }, 6e4);

   console.log(chalk.green.bgGreen.bold('i am now online and ready to go!'));
});

client.on('disconnect', () => {
   console.log(chalk.red.bgRed.bold('i just disconnected, making sure you know, I will reconnect now...'));
});

client.on('reconnecting', () => {
   console.log(chalk.yellow.bold('i am reconnecting now!'));
});

client.on('message', message => {
   if (message.content.includes('flip a coin')) {
      let chances = [
         'heads!',
         'tails!'
      ];
      let response = chances[Math.floor(Math.random() * chances.length)];
      let user = message.author;
      message.channel.send(new MessageEmbed()
         .setTitle('`☁️` coin flip')
         .setDescription(`you landed on ${response}`)
         .setFooter(`message executed by ${user.username}`)
         .setColor('#daffff')
         .setThumbnail('https://i.pinimg.com/originals/c1/2d/c5/c12dc536b8f8797b629eb9942a2dbbf1.gif')
      )
   }
});

['command'].forEach(handler => {
   require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);
