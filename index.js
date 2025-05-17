require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const channel = await client.channels.fetch(process.env.BUMP_CHANNEL);

    async function bump() {
        try {
            await channel.sendSlash('302050872383242240', 'bump');
            console.count('Bumped!');
        } catch (error) {
            console.error('Failed to send bump request:', error.message);
            console.log('Waiting for the next bump time...');
        }
    }

    async function loop() {
        while (true) {
            const randomNum = Math.round(Math.random() * (9000000 - 7200000 + 1)) + 7200000;
            await bump();
            console.log(`Waiting for ${randomNum / 1000 / 60} minutes before the next bump...`);
            await new Promise(resolve => setTimeout(resolve, randomNum));
        }
    }

    await bump();
    loop();
});

client.login(process.env.TOKEN);
