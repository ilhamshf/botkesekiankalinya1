module.exports = (client, member) => {
    if (member.guild.id === "521567953292886016") {
        client.channels.cache.get('597757455426125835').send(
            `Hai ${member.user}, Selamat Datang di Server ${member.guild.name}`
        )
        // member.roles.add('511177887739543552')
    }


}