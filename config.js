/**
 * ============================================================
 * SHADOW DEV BOT - CONFIGURATION FILE
 * ============================================================
 * Edit this file with your bot token and channel/group links
 * ============================================================
 */

const config = {
  // Bot Configuration
  bot: {
    token: process.env.BOT_TOKEN || "8708685773:AAGhMRj0f9EyW4Gz47BdfTs2r6bMulX8ncs",
    username: "@Sktestsbot",
    name: "TEST",
    adminIds: [8627624927], // Add your Telegram user ID here
    pollInterval: 1000,
    pollingTimeout: 30
  },

  // Force Join Configuration (MANDATORY)
  channels: {
    // Telegram Channel 1 (Mandatory)
    channel1: {
      id: "-1003740544433",
      username: "@ssbugchannel",
      name: "SHADOW OFFICIAL 👑",
      link: "https://t.me/ssbugchannel",
      mandatory: true
    },
    // Telegram Channel 2 (Mandatory)
    channel2: {
      id: "-1003812008527",
      username: "@syedhacks",
      name: "TEAM SYED ARMY",
      link: "https://t.me/syedhacks",
      mandatory: true
    },
    // Telegram Group 1 (Mandatory)
    group1: {
      id: "-1003989785950",
      username: "@shadowjamm",
      name: "Shadow OFFICIAL GROUP",
      link: "https://t.me/shadowjamm",
      mandatory: true
    },
    // Telegram Group 2 (Mandatory)
    group2: {
      id: "-1003964068978",
      username: "@syedbanunbangroup",
      name: "Shadow X SYED",
      link: "https://t.me/syedbanunbangroup",
      mandatory: true
    }
  },

  // Optional Channels (Recommended but not mandatory)
  optionalChannels: {
    youtube: {
      name: "Shadow Dev YouTube",
      link: "https://youtube.com/@shadowHERE.460",
      mandatory: false,
      message: "Subscribe to our YouTube channel for tutorials!"
    },
    whatsapp: {
      name: "Shadow Dev WhatsApp",
      link: "https://whatsapp.com/channel/0029VbCi3jWCXC3EF6BXyC1S",
      mandatory: false,
      message: "Join our WhatsApp channel for instant updates!"
    }
  },

  // Website Limits
  limits: {
    dailyFreeLimit: 2,
    referralBonus: 1,
    maxWebsitesPerUser: 100,
    resetHour: 0 // Midnight reset
  },

  // Deployment Settings
  deployment: {
    baseUrl: process.env.BASE_URL || "https://your-app.up.railway.app",
    deployedPath: "./deployed",
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedDomains: ["railway.app", "vercel.app", "netlify.app"]
  },

  // Template Settings
  templates: {
    path: "./templates/categories",
    assetsPath: "./templates/assets",
    previewPath: "./templates/previews",
    categories: [
      "landing-pages",
      "portfolios",
      "business",
      "ecommerce",
      "saas",
      "agency",
      "personal",
      "startup",
      "restaurant",
      "medical",
      "education",
      "real-estate",
      "technology",
      "fashion",
      "photography",
      "fitness",
      "travel",
      "automotive",
      "entertainment",
      "nonprofit"
    ]
  },

  // Messages
  messages: {
    welcome: `🌑 *Welcome to Shadow Dev Bot!*\n\n✨ Create stunning websites in seconds!\n\n📊 *Features:*\n• 300+ Premium Templates\n• High-Level Animations\n• Instant Deployment\n• Custom Domain Support\n\n⚡ Daily Limit: 2 Websites\n👥 Refer Friends to Earn More!`,

    forceJoin: `🔒 *Complete Access Required!*\n\nPlease join our channels and groups to use the bot:\n\n*MANDATORY:*`,

    verifySuccess: `✅ *Verification Successful!*\n\nWelcome to Shadow Dev Bot! 🎉\n\nYou can now create amazing websites!`,

    dailyLimitReached: `❌ *Daily Limit Reached!*\n\nYou have used your 2 websites for today.\n\n👥 *Refer a friend to earn 1 extra website!*\n\nYour limit resets at midnight.`,

    createOrOld: `🎨 *What would you like to do?*\n\n*Create New Website* - Start from 300+ templates\n*My Websites* - Manage your existing websites`,

    adminWelcome: `🔐 *Admin Panel*\n\nWelcome, Master! \n\nChoose an option:`,

    referralMessage: `👥 *Invite Friends & Earn!*\n\nShare your referral link:\n{link}\n\n*1 Friend = 1 Extra Website/Day*`
  },

  // Admin Panel
  admin: {
    commands: ["/admin", "/panel", "/dashboard"],
    features: [
      "view_stats",
      "manage_users",
      "edit_limits",
      "view_websites",
      "broadcast",
      "add_template",
      "bot_settings"
    ]
  },

  // Animation Presets for Templates
  animations: {
    fadeIn: "fadeIn",
    slideUp: "slideUp",
    slideDown: "slideDown",
    slideLeft: "slideLeft",
    slideRight: "slideRight",
    zoomIn: "zoomIn",
    zoomOut: "zoomOut",
    rotateIn: "rotateIn",
    bounceIn: "bounceIn",
    flipIn: "flipIn",
    pulse: "pulse",
    shake: "shake",
    glow: "glow",
    neon: "neon",
    glitch: "glitch",
    morph: "morph",
    particle: "particle",
    typewriter: "typewriter",
    scrollReveal: "scrollReveal",
    parallax: "parallax",
    gradientShift: "gradientShift",
    borderGlow: "borderGlow",
    textScramble: "textScramble",
    magneticButton: "magneticButton",
    liquidEffect: "liquidEffect",
    3dTilt: "3dTilt",
    waveAnimation: "waveAnimation",
    floatingElements: "floatingElements",
    matrixRain: "matrixRain",
    aurora: "aurora"
  }
};

module.exports = config;
