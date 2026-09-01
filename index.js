const http = require('http');
const bedrock = require('bedrock-protocol');

// Web server for Render health checks
http.createServer((req, res) => {
  res.write("Bot is running!");
  res.end();
}).listen(process.env.PORT || 8080);

function createBot() {
  console.log("Connecting to Geyser/Falix server...");

  const client = bedrock.createClient({
    host: '162.55.100.208',
    port: 48318,
    username: 'AFK_Bot_247',
    offline: true
  });

  client.on('spawn', () => {
    console.log('Bot joined the server successfully!');

    // Send register/login commands after spawning
    setTimeout(() => {
      client.queue('text', {
        type: 'chat',
        needs_translation: false,
        source_name: '',
        message: '/register BotPassword123 BotPassword123',
        xuid: '',
        platform_chat_id: ''
      });
    }, 2000);

    setTimeout(() => {
      client.queue('text', {
        type: 'chat',
        needs_translation: false,
        source_name: '',
        message: '/login BotPassword123',
        xuid: '',
        platform_chat_id: ''
      });
    }, 4000);
  });

  client.on('disconnect', (packet) => {
    console.log('Disconnected from server:', packet.reason || packet);
    setTimeout(createBot, 15000);
  });

  client.on('error', (err) => {
    console.log('Bot Error:', err.message || err);
  });
}

createBot();
