const Discord = require("discord.js");
const Kato = require("./handler/ClientBuilder.js");
const client = new Kato({ disableMentions: 'everyone', fetchAllMembers: true, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const clients = new Discord.Client()
const recent = new Set();
const roleClaim = require('./role-claim')
const { MessageEmbed } = require('discord.js')


require('discord-logs')(client);
require("./handler/module.js")(client);
require("./handler/Event.js")(client);

// clients.on('ready', () => {
//   roleClaim(client)
// })


client.package = require("./package.json")
client.on("warn", console.warn);
client.on("error", console.error);
client.on("disconnect", () => console.log("Disconnected."));
client.on("reconnecting", () => console.log("Reconnecting."));

client.login(client.config.discord.token).catch(console.error);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", reason.stack || reason);
  console.error(reason);
});

process.on("uncaughtException", err => {
  console.error(new Date());
  console.error(`Caught exception: ${err}`);
  console.error(err);
  if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
    console.error("true");
  }
});

//welcome message
client.on('guildMemberAdd', async(member) => { // this event gets triggered when a new member joins the server!

  const Channel = member.guild.channels.cache.get('597757455426125835')
  const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle(`Member Baru ${member.guild.name} :confetti_ball:`)
      .setDescription(`**${member.displayName}** Selamat Datang di ${member.guild.name}, sekarang kita mempunyai ${member.guild.memberCount} member!`)
  Channel.send(embed)
  member.user.send(`Hai ${member.user}, Selamat Datang di Server ${member.guild.name}`)
})
client.on('guildMemberRemove', async(member) => { // this event gets triggered when a new member leaves the server!
  const Channel = member.guild.channels.cache.get('597757455426125835')
  const embed = new MessageEmbed()
      .setColor('RED')
      .setTitle(`Member keluar dari sever ${member.guild.name}`)
      .setDescription(`**${member.displayName}** Telah meninggalkan ${member.guild.name}, sekarang kita ${member.guild.memberCount} member!`)
  Channel.send(embed)
  member.user.send(`Hai ${member.user}, terimakasih sudah mampir di Server ${member.guild.name}`)
})