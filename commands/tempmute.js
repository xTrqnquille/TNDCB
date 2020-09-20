const discord = require("discord.js");
const ms = require("ms");
 
module.exports.run = async (client, message, args) => {
 
    // Video voor uitleg: 
 
    // !tempmute gebruiker tijd(h,m,s)
 
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry you can't user that command");
 
    if (!args[0]) return message.reply("No user Mentioned.");
 
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("No perms");
 
    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 
    if (!mutePerson) return message.reply("I can't find that user.");
 
    if (mutePerson.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry you Can't mute that person.");
 
    var muteRole = message.guild.roles.cache.get('755033917547085835');
 
    if (!muteRole) return message.channel.send("There is no muted role");
 
    var muteTime = args[1];
 
    if (!muteTime) return message.reply("How Long do you want to mute somebody");
 
    await (mutePerson.roles.add(muteRole.id));
    message.channel.send(`${mutePerson} Is muted for ${muteTime}`);
 
    setTimeout(function () {
 
        mutePerson.roles.remove(muteRole.id);
    
        message.channel.send(`I have unmuted ${mutePerson}.`);
    
    }, ms(muteTime));
}
 
module.exports.help = {
    name: "tempmute"
}