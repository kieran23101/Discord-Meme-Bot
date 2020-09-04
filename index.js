require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const puppeteer = require('puppeteer');
var FetchStream = require("fetch").FetchStream;

client.once('ready', () => {
    console.log('Bot is starting to watch messages!');
});

client.login(process.env.BOT_TOKEN);

function GetImageID(Url) {
    var firstPart = Url.replace("https://preview.redd.it/", "");
    return "https://i.redd.it/" + firstPart.split("?")[0];
}

client.on('message', message => {
    if (message.content === '!meme') {
        message.channel.send("Fetching a meme for " + message.member.displayName + ", one moment!");
        try {
            (async () => {
                const browser = await puppeteer.launch({
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                    ],
                });
                const page = await browser.newPage();
                await page.goto('https://www.reddit.com/r/dankmemes/new/');
                const images = await page.$$eval('img[alt=\"Post image\"].media-element.ImageBox-image', anchors => [].map.call(anchors, img => img.src));
                // console.log(images);
                message.channel.send(GetImageID(images[0]));
                await browser.close();

            })();

        } catch (Ex) {
            console.log(Ex);
        }
    }
    if (message.content === "!insult") {
        var fetchUrl = require("fetch").fetchUrl;
        // source file is iso-8859-15 but it is converted to utf-8 automatically
        fetchUrl("https://evilinsult.com/generate_insult.php?lang=en", function (error, meta, body) {
            message.channel.send(body.toString());
        });

    }
});