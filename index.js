require('dotenv').config();
const moment = require('moment')

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
moment.locale('th')

const { prefix } = require('./config.json')

client.once('ready', () => {
	console.log(`${client.user.tag}! Ready!`);
});

client.on('messageCreate', msg=>{
  
  if(msg.embeds != undefined){
    

    msg.embeds.forEach((embed) => {
      if(embed.title == "Adventure Status"){}
      let cd_time = embed.description.substring(embed.description.search('completes:') + 13, embed.description.search('completes:') + 17);
      var timen = moment().add(convertHourstoMinute(cd_time), 'minutes').format('LT')
      msg.channel.send("**Idle RPG\r\nAdventure Status**\r\nEnd >>> " + timen);
    })
  }

  if(msg.content === `${prefix}ping`){
    msg.reply('PONG !!!')
  }
})

function convertHourstoMinute(str) {
  let [hours, minutes] = str.split(':');
  return (+hours * 60) + (+minutes);
}

client.login(process.env.DISCORD_TOKEN);