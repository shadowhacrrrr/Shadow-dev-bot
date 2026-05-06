/**
 * ============================================================
 * SHADOW DEV BOT - START SCRIPT
 * ============================================================
 * Starts both the bot and the web server
 * ============================================================
 */

require('dotenv').config();

// Start the web server
const server = require('./bot/server');

// Start the Telegram bot
const bot = require('./bot/index');

console.log('🌑 Shadow Dev Bot is now running!');
console.log('🤖 Bot: Polling mode active');
console.log('🌐 Server: HTTP mode active');
console.log('📡 Health Check: /health');

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
