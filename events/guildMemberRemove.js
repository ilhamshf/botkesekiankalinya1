module.exports = (client, member) => {
    if (member.guild.id === "521567953292886016") {
        client.channels.cache.get('597757455426125835').send(
            `${member.user}, Telah keluar dari Server ${member.guild.name}`
        )
    }






}