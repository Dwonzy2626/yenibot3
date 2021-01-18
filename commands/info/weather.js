const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
   name: 'weather',
   category: 'info',
   description: 'Show the weather at a certain zipcode',
   usage: '[command | alias]',
   enabled: true,
   run: async (client, message, args) => {
      if (message.author.bot) return;
      if (!message.guild) return;
      if (!message.content.startsWith(';;')) return;

      var zipCode = message.content.split(' ')[1];

      if (zipCode === undefined || zipCode.length != 5 || parseInt(zipCode) === NaN) {
         return message.channel.send('Invalid zip code. It needs to be in the US.').catch(console.error)
      } else {
         fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${process.env.OPENWEATHER_KEY}`)
            .then(response => {
               return response.json();
            })
            .then(parsedWeather => {
               const weatherPics = {
                  'Clouds': '⛅️',
                  'Rain': '🌧',
                  'Haze': '🌫',
                  'Thunderstorm': '⛈',
                  'Sunny': '☀️',
                  'Mist': '🌫',
                  'Clear': '☀️',
                  'Dust': '🌪'
               }

               if (parsedWeather.cod === '404') {
                  message.channel.send('The zip code is either invalid or there is no info on it!')
               } else {
                  const currentWeather = parsedWeather.weather[0].main;

                  const embed = new Discord.MessageEmbed()
                     .setColor('#DAFFFF')
                     .addFields({
                        name: `**location** ;; ${parsedWeather.name}, ${parsedWeather.sys.country}`,
                        value: [
                           `${weatherPics[currentWeather]} **forecast** ;; ${currentWeather}, ${parsedWeather.weather[0].description}`,
                           `🌡 **current temp** ;; ${(Math.round(((parsedWeather.main.temp - 273.15))))}° C or ${(Math.round(((parsedWeather.main.temp - 273.15) * 9 / 5 + 32)))}° F`,
                           `🔺 **high** ;; ${(Math.round(((parsedWeather.main.temp_max - 273.15))))}° C or ${(Math.round(((parsedWeather.main.temp_max - 273.15) * 9 / 5 + 32)))}° F`,
                           `🔻 ** low ** ;; ${(Math.round(((parsedWeather.main.temp_min - 273.15))))} ° C or or ${(Math.round(((parsedWeather.main.temp_min - 273.15) * 9 / 5 + 32)))} ° F`
                        ].join('\n')
                     })
                     .setTimestamp();

                  message.channel.send(embed);
               }
            });
      }
   }
}