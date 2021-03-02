const roleClaim = require('../role-claim')
let discord = require('discord.js');
const memberCount = require('../member-count');

module.exports = client => {
  console.log('Tersambung.');
  client.user.setStatus('idle');
  roleClaim(client)
  memberCount(client)

  function randomStatus() {
    let userTotal = client.guilds.cache.get("521567953292886016").memberCount;
    let status = [
      "TCH Team Discord",
      "type .help",
      "Owner by ilhamshf#8364",
      `Members : ${userTotal}`
    ];
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], { type: 'PLAYING' });

  }; setInterval(randomStatus, 15000);

  function pengingat() {
    require('../plugin/pengingat.js')(client);
  } setInterval(pengingat, 60000);

  function mutedDuration() {
    require('../plugin/durationMute.js')(client);
  } setInterval(mutedDuration, 30000);
}