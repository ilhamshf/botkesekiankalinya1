const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (client.config.discord.channels.includes(message.channel.id)) return;
  try {
    let bicon = client.user.displayAvatarURL();
    let botembed = new Discord.MessageEmbed()
      .setColor(client.warna.kato)
      .setThumbnail(bicon)
      .addField("Nama", "TCH Team")
      .addField("Bibuat Tanggal", "November 2020")
      .addField("Pemilik", "ilhamshf#8364")
      .addField("Bahasa", "Discord.JS dengan NodeJS")
      .addField("Motto", "Bagi Steam Wallet ke owner wkwkw")
      .addField("Terima Kasih Kepada", "Karen-Araragi-Master dan Kato Megumi Fanbase Server")
      .setFooter("Stable Release | ilhamshf#8364")
      .setAuthor(message.guild.name, message.guild.iconURL())
    return message.channel.send(botembed);
  } catch (error) {
    return message.channel.send(`Something went wrong: ${error.message}`);
    // Restart the bot as usual.
  }
}

exports.conf = {
  aliases: ["tch"],
  cooldown: 5
}

exports.help = {
  name: 'about',
  description: 'melihat tentang tch-Bot',
  usage: '.about',
  example: '.about'
}