const http = require('http');
const mineflayer = require('mineflayer');

// Simple web server so cloud hosts don't close the process
http.createServer((req, res) => {
    res.write("Bot is running!");
    res.end();
}).listen(process.env.PORT || 8080);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'YOUR_SERVER_IP.falix.gg', // Put your Falix IP here
        port: 25565,                      // Put your Falix Port here
        username: 'AFK_Bot_247',
        version: false
    });

    bot.on('spawn', () => {
        console.log('Bot joined!');
        // Anti-AFK jump loop every 30 seconds
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('end', () => {
        console.log('Disconnected. Reconnecting in 15 seconds...');
        setTimeout(createBot, 15000);
    });

    bot.on('error', err => console.log('Error:', err));
}

createBot();
