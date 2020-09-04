const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const puppeteer = require('puppeteer');


client.once('ready', () => {
    console.log('Bot is starting to watch messages!');
});

client.login(config.token);

function GetImageID(Url) {
    var firstPart = Url.replace("https://preview.redd.it/", "");
    return "https://i.redd.it/" + firstPart.split("?")[0];
}

client.on('message', message => {
    if (message.content === '!meme') {
        message.channel.send("Fetching a meme for " + message.member.displayName + ", one moment!");
        message.client.nam
        try {
            (async () => {
                const browser = await puppeteer.launch({ headless: true });
                const page = await browser.newPage();
                await page.goto('https://www.reddit.com/r/dankmemes/new/');
                const images = await page.$$eval('img[alt=\"Post image\"].media-element.ImageBox-image', anchors => [].map.call(anchors, img => img.src));
                console.log(images);
                message.channel.send(GetImageID(images[0]));
                await browser.close();

            })();

        } catch (Ex) {
            console.log(Ex);
        }
    }
});