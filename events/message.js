const Discord = require('discord.js'),
  cooldowns = new Discord.Collection(),
  db = require('quick.db')

module.exports = async (client, message) => {
  
  if (message.channel.type === "dm" || message.author.bot || message.author === client.user) return;

  let prefix;
  if (message.content.toLowerCase().startsWith(client.config.discord.prefix[0])) {
    prefix = client.config.discord.prefix[0]; // Cek folder, config.json.
  } else if (message.content.toLowerCase().startsWith(client.config.discord.prefix[1])) {
    prefix = client.config.discord.prefix[1];
  }
  require('../plugin/ar.js')(client, message)
  require('../plugin/afk.js')(client, message)

  //Prefix nya bisa antara di mention, ama antara pake prefix biasa (k!)

  if (!message.content.toLowerCase().startsWith(prefix)) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  let sender = message.author;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  } // Ini tuh ibaratkan parameter.

  

  let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return;
  if (!cooldowns.has(commandFile.help.name)) {
    cooldowns.set(commandFile.help.name, new Discord.Collection());
  }

  //dsaible all commands  
  let channels = db.get('disableAllCommands');
  if (channels === null) channels = []; 
  if (channels.includes(message.channel.id)) {
    if (commandFile.help.name === 'on') commandFile.run(client, message, args);
      else return;
  }

  //disable specifict channel
  let table = new db.table('disableCommands');
  let channel = table.get(commandFile.help.name);
  if (channel === null) channel = [];
  //disable cmd if channelID available in db
  if (channel.includes(message.channel.id)) return;

  
  const member = message.member;
  const now = Date.now();
  const timestamps = cooldowns.get(commandFile.help.name);
  const cooldownAmount = (commandFile.conf.cooldown || 3) * 1000

  if (!timestamps.has(member.id)) {
    if (!client.config.discord.owners.includes(message.author.id)) {
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;

    if (now < expirationTime) {

      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send({ embed: { color: 0xcc5353, description: `Tunggu **${timeLeft.toFixed(1)}** detik baru bisa pake kembali.` } }).then(msg => msg.delete({ timeout: 5000 }));
      // Bisa diubah teks nya, kalo misalnya user nya lagi cooldown.
    }

    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  }



  try {
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd)); // Jalani command dengan aliases juga bisa. Misalnya: k!serverinfo, k!server, k!s
    command.run(client, message, args);
  } catch (e) {
    console.log(e.message);
  } finally {
    console.log(`${sender.tag} (${sender.id}) menggunakan command ${cmd}`); // Mengetahui, siapa aja yang make command (cuman di console log aja kok)
  }
}