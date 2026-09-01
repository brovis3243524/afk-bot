const http = require('http');
const mineflayer = require('mineflayer');

// Create a lightweight HTTP server so Render keeps the service active
http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 8080);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'krackedsmp.falixsrv.me',
    port: 48318,
    username: 'AFK_Bot_247',
    version: '1.20.4',
    checkTimeoutInterval: 60000
  });

  bot.on('spawn', () => {
    console.log('Bot joined the server!');
    
    // Auto-register / auto-login for cracked/AuthMe setups
    bot.chat('/register BotPassword123 BotPassword123');
    bot.chat('/login BotPassword123');

    // Jump every 30 seconds to stay active
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
