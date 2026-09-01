const http = require('http');
const mineflayer = require('mineflayer');

// Keep-alive web server for Render
http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 8080);

function createBot() {
  console.log("Connecting Mineflayer bot...");

  const bot = mineflayer.createBot({
    host: '162.55.100.208',
    port: 48318,
    username: 'AFK_Bot_247',
    auth: 'offline',
    version: '1.21', // Set to '1.21' or '1.21.1' to pass ViaVersion check
    checkTimeoutInterval: 60000
  });

  bot.on('spawn', () => {
    console.log('Bot joined the server successfully!');

    setTimeout(() => {
      bot.chat('/register BotPassword123 BotPassword123');
      bot.chat('/login BotPassword123');
    }, 2000);

    // Anti-AFK jump loop every 30 seconds
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('Bot was kicked. Reason:', JSON.stringify(reason));
  });

  bot.on('end', (reason) => {
    console.log('Disconnected:', reason, '| Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('Bot Error:', err.message || err));
}

createBot();
