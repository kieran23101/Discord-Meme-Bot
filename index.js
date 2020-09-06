require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
var actions = require("./actions");

client.once('ready', () => {
    console.log('Bot is starting to watch messages!');
});
client.login(process.env.BOT_TOKEN);


client.on('message', message => {
    if (message.content === '!meme') {
        try {
            actions.GetDankMeme().then((rsp) => {
                message.delete();
                message.channel.send(rsp.url);
            }).catch(function (err) {
                console.log(`Error: ${err}`)
            });
        } catch (Error) {
            message.channel.send(Error);
        }
    }
    if (message.content === "!insult") {
        try {
            actions.GetInsult().then((rsp) => {
                message.delete();
                message.channel.send(rsp);
            })
        } catch (Error) {
            message.channel.send(Error);
        }
    }

    // if (message.content.toLowerCase().startsWith("!clear")) {
    //     async function clear() {
    //         message.delete();
    //         const fetched = await message.channel.messages.fetch({ limit: 99 });
    //         message.channel.bulkDelete(fetched);
    //     }
    //     clear();
    // }
});