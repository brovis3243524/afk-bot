// index.js
const mineflayer = require('mineflayer');
const express = require('express');

// Express HTTP web server to pass health checks on hosts like Render
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('AFK Bot Status: Running');
});

app.listen(PORT, () => {
  console.log(`Keep-alive web server bound to port ${PORT}`);
});

// Minecraft Bot Configuration
const BOT_OPTIONS = {
  host: 'krackedsmp.falixsrv.me',
  port: 25565,
  username: 'AFK_Bot_247',
  version: '1.20.4',
  auth: 'offline'
};

let bot = null;

function createAFKBot() {
  console.log('Initiating connection to Minecraft server...');
  bot = mineflayer.createBot(BOT_OPTIONS);

  let chatTimer = null;
  let movementTimer = null;

  bot.once('spawn', () => {
    console.log(`Successfully connected as ${bot.username}`);

    // Auto-login command 2 seconds after spawning
    setTimeout(() => {
      bot.chat('/login BotPassword123');
    }, 2000);

    // Send keep-alive command every 5 minutes (300,000 ms)
    chatTimer = setInterval(() => {
      if (bot && bot.entity) {
        bot.chat('/ping');
      }
    }, 300000);

    // Anti-AFK camera rotation and jump every 60 seconds (60,000 ms)
    movementTimer = setInterval(() => {
      if (bot && bot.entity) {
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * Math.PI;
        bot.look(yaw, pitch, true);

        bot.setControlState('jump', true);
        setTimeout(() => {
          if (bot) bot.setControlState('jump', false);
        }, 300);
      }
    }, 60000);
  });

  const cleanUpAndReconnect = () => {
    if (chatTimer) clearInterval(chatTimer);
    if (movementTimer) clearInterval(movementTimer);

    console.log('Bot disconnected or process ended. Attempting reconnect in 15 seconds...');
    setTimeout(() => {
      createAFKBot();
    }, 15000);
  };

  bot.on('error', (err) => {
    console.error('Mineflayer Error:', err.message);
  });

  bot.on('kicked', (reason) => {
    console.log('Bot kicked from server:', reason);
  });

  bot.once('end', () => {
    cleanUpAndReconnect();
  });
}

createAFKBot();
