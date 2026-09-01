// Bypass internal protocol version checking for custom server strings
try {
  const versionCheckingPath = require.resolve('minecraft-protocol/src/client/versionChecking');
  require.cache[versionCheckingPath] = {
    id: versionCheckingPath,
    filename: versionCheckingPath,
    loaded: true,
    exports: () => {}
  };
} catch (e) {}

const http = require('http');
const mineflayer = require('mineflayer');

http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 8080);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'krackedsmp.falixsrv.me',
    port: 48318,
    username: 'AFK_Bot_247',
    version: '1.20.6', // Change to '1.21' if your server has updated to 1.21
    auth: 'offline',
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

  bot.on('kicked', (reason) => {
    console.log('Bot was kicked. Reason:', JSON.stringify(reason));
  });

  bot.on('end', (reason) => {
    console.log('Disconnected. Reason:', reason, '| Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', err => console.log('Error:', err));
}

createBot();
