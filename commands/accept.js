const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let guild = bot.guilds.find(`id`, "400508946709872660")
let member = await guild.fetchMember(message.author.id)
if(!member) return;
if (member.roles.get("400523390441619457") //mod
 || member.roles.get("400512010590355458") //admin
 || member.roles.get("415914501909774336") //head admin
 || member.roles.get("400511826745360405") //comanager
 || member.roles.get("400511217061330955")) { //owner 
let casenumber = args[0]
if(!casenumber) return message.reply("Please provide a case number!")
	let channel = bot.channels.find(`id`, "411246419979141121")
	let amessages = await channel.fetchMessages( {limit: 100} )
	let bmessages = amessages.filter(m => m.embeds[0] && m.embeds[0].fields && m.embeds[0].fields[0].value === casenumber)
	let delmessage = bmessages.first()
let userid = delmessage.embeds[0].fields[5].value
let user = await bot.fetchUser(userid)
if(!user) return message.reply("Couldn't find user!")
try {
await user.send(":white_check_mark: **Scam Report Accepted -- After reviewing your report, our moderators and admins have decided this is a valid scam report. This user will be added to our database shortly.** :white_check_mark:")
  message.react("✅")
 let mod = bot.channels.find(`id`, "418531258344275978")
 let thing = new Discord.RichEmbed()
	.setTitle("Accepted Report")
 .setColor("#FF0000")
 .addField("Time Accepted", message.createdAt)
	.addField("Moderator", message.author)
	.addField("Accepted", user.tag)
 	.addField("Accepted ID", user.id)

 await mod.send(thing)
}
catch (e) {
message.reply("Couldn't DM this user!")
}
	
	if(delmessage) await delmessage.delete()
}

 }

module.exports.help = {
    name: "accept"
}
