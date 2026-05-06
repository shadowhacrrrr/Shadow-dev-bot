/**
 * ============================================================
 * SHADOW DEV BOT - MAIN ENTRY POINT
 * ============================================================
 * Premium Website Builder & Deployer Telegram Bot
 * 300+ Templates | High-Level Animations | Instant Deployment
 * ============================================================
 */

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');
const db = require('../utils/database');
const deployer = require('../utils/deployer');
const templates = require('../utils/templates');
const helpers = require('../utils/helpers');
const fs = require('fs-extra');
const path = require('path');

// Initialize bot with polling (NO WEBHOOK)
const bot = new TelegramBot(config.bot.token, {
  polling: {
    interval: config.bot.pollInterval,
    timeout: config.bot.pollingTimeout,
    params: {
      allowed_updates: ["message", "callback_query", "inline_query"]
    }
  },
  onlyFirstMatch: true
});

// Store user sessions
const userSessions = new Map();

console.log('🌑 Shadow Dev Bot Started!');
console.log('🤖 Bot Mode: Polling (No Webhook)');
console.log('📡 Status: Online');

// ==================== MIDDLEWARE ====================

// Check if user is member of required channels
async function isMemberOfChannels(userId) {
  try {
    const channels = [
      config.channels.channel1.id,
      config.channels.channel2.id,
      config.channels.group1.id,
      config.channels.group2.id
    ];

    for (const channelId of channels) {
      try {
        const member = await bot.getChatMember(channelId, userId);
        if (member.status === 'left' || member.status === 'kicked') {
          return false;
        }
      } catch (e) {
        console.error(`Error checking membership for ${channelId}:`, e.message);
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error('Membership check error:', error);
    return false;
  }
}

// Force join keyboard
function getForceJoinKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "📢 " + config.channels.channel1.name, url: config.channels.channel1.link },
        { text: "📢 " + config.channels.channel2.name, url: config.channels.channel2.link }
      ],
      [
        { text: "💬 " + config.channels.group1.name, url: config.channels.group1.link },
        { text: "💬 " + config.channels.group2.name, url: config.channels.group2.link }
      ],
      [
        { text: "🔴 YouTube (Optional)", url: config.optionalChannels.youtube.link },
        { text: "🟢 WhatsApp (Optional)", url: config.optionalChannels.whatsapp.link }
      ],
      [
        { text: "✅ Verify Joined", callback_data: "verify_join" }
      ]
    ]
  };
}

// Main menu keyboard
function getMainMenuKeyboard(isAdmin = false) {
  const keyboard = [
    [
      { text: "🆕 Create New Website", callback_data: "create_new" },
      { text: "🌐 My Websites", callback_data: "my_websites" }
    ],
    [
      { text: "👥 Refer & Earn", callback_data: "refer_earn" },
      { text: "📊 My Stats", callback_data: "my_stats" }
    ],
    [
      { text: "❓ Help", callback_data: "help" },
      { text: "📞 Support", callback_data: "support" }
    ]
  ];

  if (isAdmin) {
    keyboard.push([
      { text: "🔐 Admin Panel", callback_data: "admin_panel" }
    ]);
  }

  return { inline_keyboard: keyboard };
}

// ==================== COMMAND HANDLERS ====================

// /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username || msg.from.first_name;
  const refCode = msg.text.split(' ')[1];

  // Register user
  db.registerUser(userId, username, refCode);

  // Check if member of channels
  const isMember = await isMemberOfChannels(userId);

  if (!isMember) {
    const forceJoinText = config.messages.forceJoin +
      `\n1️⃣ ${config.channels.channel1.name}` +
      `\n2️⃣ ${config.channels.channel2.name}` +
      `\n3️⃣ ${config.channels.group1.name}` +
      `\n4️⃣ ${config.channels.group2.name}` +
      `\n\n🎯 *Also Recommended:*` +
      `\n📺 ${config.optionalChannels.youtube.name}` +
      `\n📱 ${config.optionalChannels.whatsapp.name}`;

    bot.sendMessage(chatId, forceJoinText, {
      parse_mode: "Markdown",
      reply_markup: getForceJoinKeyboard()
    });
    return;
  }

  // Send welcome message
  const welcomeText = config.messages.welcome +
    `\n\n👤 *User:* @${username}` +
    `\n📅 *Joined:* ${new Date().toLocaleDateString()}` +
    `\n\n🚀 *Ready to create amazing websites!*`;

  bot.sendMessage(chatId, welcomeText, {
    parse_mode: "Markdown",
    reply_markup: getMainMenuKeyboard(config.bot.adminIds.includes(userId))
  });
});

// /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpText = `❓ *Shadow Dev Bot Help*\n\n` +
    `*Commands:*\n` +
    `/start - Start the bot\n` +
    `/create - Create a new website\n` +
    `/mywebs - View your websites\n` +
    `/stats - Your statistics\n` +
    `/refer - Get referral link\n` +
    `/admin - Admin panel (admins only)\n\n` +
    `*How to use:*\n` +
    `1. Join all required channels/groups\n` +
    `2. Click "Create New Website"\n` +
    `3. Choose a template category\n` +
    `4. Preview or Create\n` +
    `5. Customize your content\n` +
    `6. Deploy & Get your link!\n\n` +
    `*Daily Limit:* 2 websites/day\n` +
    `*Referral Bonus:* 1 extra per friend`;

  bot.sendMessage(chatId, helpText, { parse_mode: "Markdown" });
});

// /create command
bot.onText(/\/create/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  const isMember = await isMemberOfChannels(userId);
  if (!isMember) {
    bot.sendMessage(chatId, "❌ Please join all required channels first!\nUse /start to verify.", {
      parse_mode: "Markdown"
    });
    return;
  }

  showCategories(chatId, userId);
});

// /mywebs command
bot.onText(/\/mywebs/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  showUserWebsites(chatId, userId);
});

// /stats command
bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  showUserStats(chatId, userId);
});

// /refer command
bot.onText(/\/refer/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const refLink = `https://t.me/${config.bot.username}?start=${userId}`;

  const refText = config.messages.referralMessage.replace('{link}', refLink);

  bot.sendMessage(chatId, refText, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📤 Share Link", url: `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent('Join Shadow Dev Bot and create amazing websites!')}` }]
      ]
    }
  });
});

// /admin command
bot.onText(/\/admin/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!config.bot.adminIds.includes(userId)) {
    bot.sendMessage(chatId, "❌ You are not authorized!");
    return;
  }

  showAdminPanel(chatId);
});

// ==================== CALLBACK QUERY HANDLERS ====================

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;
  const messageId = query.message.message_id;

  try {
    await bot.answerCallbackQuery(query.id);

    // Verify Join
    if (data === 'verify_join') {
      const isMember = await isMemberOfChannels(userId);
      if (isMember) {
        db.verifyUser(userId);
        bot.editMessageText(config.messages.verifySuccess, {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: "Markdown",
          reply_markup: getMainMenuKeyboard(config.bot.adminIds.includes(userId))
        });
      } else {
        bot.answerCallbackQuery(query.id, {
          text: "❌ You haven't joined all channels yet!",
          show_alert: true
        });
      }
      return;
    }

    // Create New Website
    if (data === 'create_new') {
      const canCreate = db.canCreateWebsite(userId);
      if (!canCreate.allowed) {
        bot.sendMessage(chatId, config.messages.dailyLimitReached, { parse_mode: "Markdown" });
        return;
      }
      showCategories(chatId, userId);
      return;
    }

    // My Websites
    if (data === 'my_websites') {
      showUserWebsites(chatId, userId);
      return;
    }

    // Refer & Earn
    if (data === 'refer_earn') {
      const refLink = `https://t.me/${config.bot.username}?start=${userId}`;
      const user = db.getUser(userId);
      const refText = `👥 *Refer & Earn*\n\n` +
        `Your Referral Link:\n\`${refLink}\`\n\n` +
        `📊 *Your Referrals:* ${user.referrals || 0}\n` +
        `🎁 *Bonus Earned:* ${user.referrals || 0} websites\n\n` +
        `*1 Friend = 1 Extra Website/Day*`;

      bot.sendMessage(chatId, refText, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "📤 Share", url: `https://t.me/share/url?url=${encodeURIComponent(refLink)}` }]
          ]
        }
      });
      return;
    }

    // My Stats
    if (data === 'my_stats') {
      showUserStats(chatId, userId);
      return;
    }

    // Help
    if (data === 'help') {
      bot.sendMessage(chatId, `❓ *Help*\n\nUse /create to start building websites!\n\n*Steps:*\n1. Choose category\n2. Select template\n3. Preview or Create\n4. Customize content\n5. Deploy!`, { parse_mode: "Markdown" });
      return;
    }

    // Support
    if (data === 'support') {
      bot.sendMessage(chatId, `📞 *Support*\n\nJoin our support group:\n${config.channels.group2.link}\n\nOr contact admin.`, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "💬 Support Group", url: config.channels.group2.link }]
          ]
        }
      });
      return;
    }

    // Admin Panel
    if (data === 'admin_panel') {
      if (!config.bot.adminIds.includes(userId)) return;
      showAdminPanel(chatId);
      return;
    }

    // Category Selection
    if (data.startsWith('cat_')) {
      const category = data.replace('cat_', '');
      showTemplates(chatId, userId, category);
      return;
    }

    // Template Preview
    if (data.startsWith('preview_')) {
      const templateId = data.replace('preview_', '');
      showTemplatePreview(chatId, userId, templateId);
      return;
    }

    // Template Create (Start Customization)
    if (data.startsWith('create_')) {
      const templateId = data.replace('create_', '');
      startCustomization(chatId, userId, templateId);
      return;
    }

    // Handle customization steps
    if (data.startsWith('custom_')) {
      const parts = data.split('_');
      const action = parts[1];
      const templateId = parts[2];
      handleCustomizationStep(chatId, userId, action, templateId, messageId);
      return;
    }

    // Deploy Website
    if (data.startsWith('deploy_')) {
      const templateId = data.replace('deploy_', '');
      deployWebsite(chatId, userId, templateId);
      return;
    }

    // Delete Website
    if (data.startsWith('delete_web_')) {
      const webId = data.replace('delete_web_', '');
      deleteWebsite(chatId, userId, webId);
      return;
    }

    // Back buttons
    if (data === 'back_main') {
      bot.editMessageText(config.messages.welcome, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown",
        reply_markup: getMainMenuKeyboard(config.bot.adminIds.includes(userId))
      });
      return;
    }

    if (data === 'back_categories') {
      showCategories(chatId, userId, messageId);
      return;
    }

    // Admin actions
    if (data.startsWith('admin_')) {
      if (!config.bot.adminIds.includes(userId)) return;
      handleAdminActions(chatId, data, messageId);
      return;
    }

  } catch (error) {
    console.error('Callback query error:', error);
    bot.answerCallbackQuery(query.id, { text: "❌ An error occurred!" });
  }
});

// ==================== MESSAGE HANDLERS ====================

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;

  if (!text || text.startsWith('/')) return;

  // Check if user is in customization mode
  const session = userSessions.get(userId);
  if (session && session.step) {
    handleCustomizationInput(chatId, userId, text, session);
    return;
  }
});

// ==================== FUNCTIONS ====================

// Show Categories
function showCategories(chatId, userId, messageId = null) {
  const categories = templates.getCategories();
  const keyboard = [];

  for (let i = 0; i < categories.length; i += 2) {
    const row = [];
    row.push({ text: categories[i].icon + " " + categories[i].name, callback_data: `cat_${categories[i].id}` });
    if (categories[i + 1]) {
      row.push({ text: categories[i + 1].icon + " " + categories[i + 1].name, callback_data: `cat_${categories[i + 1].id}` });
    }
    keyboard.push(row);
  }

  keyboard.push([{ text: "🔙 Back", callback_data: "back_main" }]);

  const text = `🎨 *Choose a Category*\n\nSelect from ${categories.length} categories with 300+ templates:`;

  if (messageId) {
    bot.editMessageText(text, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: keyboard }
    });
  } else {
    bot.sendMessage(chatId, text, {
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: keyboard }
    });
  }
}

// Show Templates in Category
function showTemplates(chatId, userId, categoryId) {
  const templatesList = templates.getTemplatesByCategory(categoryId);
  const category = templates.getCategoryById(categoryId);

  if (templatesList.length === 0) {
    bot.sendMessage(chatId, "❌ No templates found in this category!", {
      reply_markup: { inline_keyboard: [[{ text: "🔙 Back", callback_data: "back_categories" }]] }
    });
    return;
  }

  const keyboard = [];
  for (let i = 0; i < templatesList.length; i += 2) {
    const row = [];
    row.push({ text: templatesList[i].name, callback_data: `preview_${templatesList[i].id}` });
    if (templatesList[i + 1]) {
      row.push({ text: templatesList[i + 1].name, callback_data: `preview_${templatesList[i + 1].id}` });
    }
    keyboard.push(row);
  }

  keyboard.push([{ text: "🔙 Back to Categories", callback_data: "back_categories" }]);

  bot.sendMessage(chatId, `📁 *${category.name}*\n\n📝 ${templatesList.length} templates available:\n\nClick to preview:`, {
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: keyboard }
  });
}

// Show Template Preview
async function showTemplatePreview(chatId, userId, templateId) {
  const template = templates.getTemplateById(templateId);
  if (!template) {
    bot.sendMessage(chatId, "❌ Template not found!");
    return;
  }

  const previewText = `🌐 *${template.name}*\n\n` +
    `📂 Category: ${template.category}\n` +
    `📝 Description: ${template.description}\n` +
    `⚡ Animations: ${template.animations?.join(', ') || 'Standard'}\n` +
    `📊 Used: ${template.usageCount} times\n\n` +
    `Choose an option:`;

  // Send preview image if available
  if (template.previewImage && fs.existsSync(template.previewImage)) {
    bot.sendPhoto(chatId, template.previewImage, {
      caption: previewText,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "👁️ Live Preview", url: template.demoUrl || config.deployment.baseUrl + '/previews/' + template.id },
            { text: "✨ Create Website", callback_data: `create_${template.id}` }
          ],
          [{ text: "🔙 Back", callback_data: `cat_${template.categoryId}` }]
        ]
      }
    });
  } else {
    bot.sendMessage(chatId, previewText, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "👁️ Live Preview", url: template.demoUrl || config.deployment.baseUrl + '/previews/' + template.id },
            { text: "✨ Create Website", callback_data: `create_${template.id}` }
          ],
          [{ text: "🔙 Back", callback_data: `cat_${template.categoryId}` }]
        ]
      }
    });
  }
}

// Start Customization
function startCustomization(chatId, userId, templateId) {
  const canCreate = db.canCreateWebsite(userId);
  if (!canCreate.allowed) {
    bot.sendMessage(chatId, config.messages.dailyLimitReached, { parse_mode: "Markdown" });
    return;
  }

  const template = templates.getTemplateById(templateId);
  userSessions.set(userId, {
    templateId: templateId,
    step: 'name',
    data: {},
    template: template
  });

  bot.sendMessage(chatId, `✨ *Creating: ${template.name}*\n\n` +
    `📝 Step 1/${template.customFields?.length || 5}\n\n` +
    `Please enter your *Name* or *Business Name*:`, {
    parse_mode: "Markdown",
    reply_markup: { force_reply: true }
  });
}

// Handle Customization Steps
function handleCustomizationStep(chatId, userId, action, templateId, messageId) {
  // This handles button-based customization
}

// Handle Customization Input
function handleCustomizationInput(chatId, userId, text, session) {
  const template = session.template;
  const fields = template.customFields || ['name', 'email', 'title', 'description', 'color'];
  const currentStep = session.step;

  // Save current input
  session.data[currentStep] = text;

  // Find next step
  const currentIndex = fields.indexOf(currentStep);
  if (currentIndex < fields.length - 1) {
    const nextField = fields[currentIndex + 1];
    session.step = nextField;

    let promptText = '';
    switch (nextField) {
      case 'name':
        promptText = 'Please enter your *Name* or *Business Name*:';
        break;
      case 'email':
        promptText = 'Please enter your *Email Address*:';
        break;
      case 'title':
        promptText = 'Please enter your *Website Title*:';
        break;
      case 'description':
        promptText = 'Please enter a *Short Description*:';
        break;
      case 'color':
        promptText = 'Choose your *Primary Color*:';
        break;
      case 'phone':
        promptText = 'Please enter your *Phone Number*:';
        break;
      case 'address':
        promptText = 'Please enter your *Address*:';
        break;
      case 'social':
        promptText = 'Enter your *Social Media Link* (optional):';
        break;
      default:
        promptText = `Please enter your *${nextField}*:`;
    }

    bot.sendMessage(chatId, `📝 Step ${currentIndex + 2}/${fields.length}\n\n${promptText}`, {
      parse_mode: "Markdown"
    });
  } else {
    // All fields completed, show summary
    finishCustomization(chatId, userId, session);
  }

  userSessions.set(userId, session);
}

// Finish Customization
function finishCustomization(chatId, userId, session) {
  const summary = `✅ *Customization Complete!*\n\n` +
    `📋 *Summary:*\n` +
    Object.entries(session.data).map(([key, value]) => `• *${key}:* ${value}`).join('\n') +
    `\n\n🚀 Ready to deploy?`;

  bot.sendMessage(chatId, summary, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🚀 Deploy Now", callback_data: `deploy_${session.templateId}` },
          { text: "🔄 Start Over", callback_data: `create_${session.templateId}` }
        ],
        [{ text: "🔙 Main Menu", callback_data: "back_main" }]
      ]
    }
  });

  // Store session data for deployment
  userSessions.set(userId, { ...session, ready: true });
}

// Deploy Website
async function deployWebsite(chatId, userId, templateId) {
  const session = userSessions.get(userId);
  if (!session || !session.ready) {
    bot.sendMessage(chatId, "❌ Please complete customization first!");
    return;
  }

  bot.sendMessage(chatId, "🚀 *Deploying your website...*\n\n⏳ Please wait...", { parse_mode: "Markdown" });

  try {
    const result = await deployer.deploy({
      templateId: templateId,
      userId: userId,
      customData: session.data,
      template: session.template
    });

    if (result.success) {
      // Save to database
      db.addWebsite(userId, {
        id: result.websiteId,
        url: result.url,
        templateId: templateId,
        templateName: session.template.name,
        createdAt: new Date().toISOString(),
        customData: session.data
      });

      // Increment usage
      db.incrementWebsiteCount(userId);
      templates.incrementUsage(templateId);

      // Clear session
      userSessions.delete(userId);

      const successText = `🎉 *Website Deployed Successfully!*\n\n` +
        `🌐 *Your Website URL:*\n${result.url}\n\n` +
        `📊 *Stats:*\n` +
        `• Websites today: ${db.getUser(userId).websitesToday}\n` +
        `• Total websites: ${db.getUser(userId).totalWebsites}\n\n` +
        `🔄 Your link is live and ready to share!`;

      bot.sendMessage(chatId, successText, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "🌐 Visit Website", url: result.url }],
            [{ text: "🆕 Create Another", callback_data: "create_new" }],
            [{ text: "🏠 Main Menu", callback_data: "back_main" }]
          ]
        }
      });
    } else {
      bot.sendMessage(chatId, `❌ *Deployment Failed!*\n\nError: ${result.error}`, { parse_mode: "Markdown" });
    }
  } catch (error) {
    console.error('Deployment error:', error);
    bot.sendMessage(chatId, "❌ *Deployment Failed!*\n\nPlease try again later.", { parse_mode: "Markdown" });
  }
}

// Show User Websites
function showUserWebsites(chatId, userId) {
  const user = db.getUser(userId);
  const websites = user.websites || [];

  if (websites.length === 0) {
    bot.sendMessage(chatId, "🌐 *My Websites*\n\nYou haven't created any websites yet!\n\nClick 'Create New Website' to start.", {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🆕 Create New Website", callback_data: "create_new" }],
          [{ text: "🔙 Back", callback_data: "back_main" }]
        ]
      }
    });
    return;
  }

  let text = `🌐 *My Websites* (${websites.length})\n\n`;
  const keyboard = [];

  websites.forEach((web, index) => {
    text += `${index + 1}. *${web.templateName}*\n   🔗 ${web.url}\n   📅 ${new Date(web.createdAt).toLocaleDateString()}\n\n`;
    keyboard.push([
      { text: `🌐 ${web.templateName}`, url: web.url },
      { text: "🗑️ Delete", callback_data: `delete_web_${web.id}` }
    ]);
  });

  keyboard.push([{ text: "🔙 Back", callback_data: "back_main" }]);

  bot.sendMessage(chatId, text, {
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: keyboard }
  });
}

// Show User Stats
function showUserStats(chatId, userId) {
  const user = db.getUser(userId);
  const limit = db.canCreateWebsite(userId);

  const statsText = `📊 *Your Statistics*\n\n` +
    `👤 Username: @${user.username}\n` +
    `📅 Joined: ${new Date(user.joinedAt).toLocaleDateString()}\n\n` +
    `🌐 *Websites:*\n` +
    `• Today: ${user.websitesToday}/${user.dailyLimit}\n` +
    `• Total: ${user.totalWebsites}\n\n` +
    `👥 *Referrals:*\n` +
    `• Invited: ${user.referrals || 0}\n` +
    `• Bonus Earned: ${user.referrals || 0}\n\n` +
    `✅ Can Create: ${limit.allowed ? 'Yes' : 'No (Daily Limit)'}`;

  bot.sendMessage(chatId, statsText, { parse_mode: "Markdown" });
}

// Delete Website
function deleteWebsite(chatId, userId, webId) {
  const result = db.deleteWebsite(userId, webId);
  if (result) {
    bot.sendMessage(chatId, "✅ Website deleted successfully!");
  } else {
    bot.sendMessage(chatId, "❌ Failed to delete website!");
  }
}

// ==================== ADMIN PANEL ====================

function showAdminPanel(chatId) {
  const stats = db.getStats();

  const text = `🔐 *Admin Panel*\n\n` +
    `📊 *Bot Statistics:*\n` +
    `• Total Users: ${stats.totalUsers}\n` +
    `• Total Websites: ${stats.totalWebsites}\n` +
    `• Today: ${stats.websitesToday}\n` +
    `• Active Today: ${stats.activeToday}\n\n` +
    `Select an action:`;

  bot.sendMessage(chatId, text, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "👥 Users", callback_data: "admin_users" },
          { text: "🌐 Websites", callback_data: "admin_websites" }
        ],
        [
          { text: "📢 Broadcast", callback_data: "admin_broadcast" },
          { text: "⚙️ Settings", callback_data: "admin_settings" }
        ],
        [
          { text: "📊 Stats", callback_data: "admin_stats" },
          { text: "📝 Add Template", callback_data: "admin_add_template" }
        ],
        [{ text: "🔙 Back", callback_data: "back_main" }]
      ]
    }
  });
}

function handleAdminActions(chatId, data, messageId) {
  const action = data.replace('admin_', '');

  switch (action) {
    case 'users':
      const users = db.getAllUsers();
      let userText = `👥 *Users (${users.length})*\n\n`;
      users.slice(0, 20).forEach((u, i) => {
        userText += `${i + 1}. @${u.username} | Webs: ${u.totalWebsites} | Ref: ${u.referrals}\n`;
      });
      bot.editMessageText(userText, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown",
        reply_markup: { inline_keyboard: [[{ text: "🔙 Back", callback_data: "admin_panel" }]] }
      });
      break;

    case 'websites':
      const allWebsites = db.getAllWebsites();
      let webText = `🌐 *All Websites (${allWebsites.length})*\n\n`;
      allWebsites.slice(0, 20).forEach((w, i) => {
        webText += `${i + 1}. ${w.templateName} | @${w.username}\n   ${w.url}\n`;
      });
      bot.editMessageText(webText, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown",
        reply_markup: { inline_keyboard: [[{ text: "🔙 Back", callback_data: "admin_panel" }]] }
      });
      break;

    case 'stats':
      const stats = db.getStats();
      const statsText = `📊 *Detailed Stats*\n\n` +
        `👥 Users: ${stats.totalUsers}\n` +
        `🌐 Websites: ${stats.totalWebsites}\n` +
        `📅 Websites Today: ${stats.websitesToday}\n` +
        `🔥 Active Today: ${stats.activeToday}\n` +
        `📈 Avg/User: ${stats.totalUsers > 0 ? (stats.totalWebsites / stats.totalUsers).toFixed(2) : 0}\n` +
        `👥 Total Referrals: ${stats.totalReferrals}`;
      bot.editMessageText(statsText, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown",
        reply_markup: { inline_keyboard: [[{ text: "🔙 Back", callback_data: "admin_panel" }]] }
      });
      break;

    case 'broadcast':
      bot.sendMessage(chatId, "📢 *Broadcast Message*\n\nSend the message you want to broadcast to all users:", {
        parse_mode: "Markdown"
      });
      // Set admin state for broadcast
      break;

    case 'settings':
      bot.editMessageText("⚙️ *Bot Settings*\n\nEdit config.js to change settings.", {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown",
        reply_markup: { inline_keyboard: [[{ text: "🔙 Back", callback_data: "admin_panel" }]] }
      });
      break;

    default:
      showAdminPanel(chatId);
  }
}

// ==================== ERROR HANDLING ====================

bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
});

bot.on('error', (error) => {
  console.error('Bot error:', error.message);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🌑 Shadow Dev Bot shutting down...');
  bot.stopPolling();
  process.exit(0);
});

module.exports = bot;
