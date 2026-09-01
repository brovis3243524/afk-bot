const http = require('http');
const mineflayer = require('mineflayer');

http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 8080);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'krackedsmp.falixsrv.me',
    port: 48318,                 // Your actual Falix port
    username: 'AFK_Bot_247',
    version: '1.20.4',           // HARDCODING this skips the auto-ping that causes the '26.2' crash
    auth: 'offline',             // Required for offline/cracked servers
    checkTimeoutInterval: 60000
  });

  bot.on('spawn', () => {
    console.log('Bot joined the server!');
    
    bot.chat('/register BotPassword123 BotPassword123');
    bot.chat('/login BotPassword123');

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
