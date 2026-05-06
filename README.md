# 🌑 Shadow Dev Bot

> **Premium Website Builder & Deployer Telegram Bot** with 300+ high-quality templates, advanced animations, and instant deployment.

---

## ✨ Features

### 🤖 Bot Features
- **Force Join System** - 2 Telegram channels + 2 Telegram groups (mandatory) + YouTube + WhatsApp (optional)
- **300+ Premium Templates** - 20 categories with high-level animations
- **Template Preview** - Live preview before creating
- **Easy Customization** - Name, email, title, description, colors
- **Instant Deployment** - One-click deploy with unique URL
- **Daily Limit System** - 2 websites/day per user
- **Referral System** - 1 friend = 1 extra website
- **Admin Panel** - Full control via Telegram & Web
- **JSON Database** - No external database needed
- **Polling Mode** - No webhook configuration needed

### 🎨 Template Categories
1. 🚀 Landing Pages
2. 💼 Portfolios
3. 🏢 Business
4. 🛒 E-Commerce
5. ☁️ SaaS
6. 🎯 Agency
7. 👤 Personal
8. 🚀 Startup
9. 🍽️ Restaurant
10. 🏥 Medical
11. 📚 Education
12. 🏠 Real Estate
13. 💻 Technology
14. 👗 Fashion
15. 📸 Photography
16. 💪 Fitness
17. ✈️ Travel
18. 🚗 Automotive
19. 🎬 Entertainment
20. 🌍 Non-Profit

### 🎬 Animation Effects
- fadeIn, slideUp, slideDown, slideLeft, slideRight
- zoomIn, zoomOut, rotateIn, bounceIn, flipIn
- pulse, shake, glow, neon, glitch
- gradientShift, borderGlow, textScramble
- parallax, scrollReveal, magneticButton
- liquidEffect, 3dTilt, waveAnimation
- floatingElements, matrixRain, aurora, morph

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo>
cd shadow-dev-bot
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` file:
```env
BOT_TOKEN=your_bot_token_from_botfather
BASE_URL=https://your-app.up.railway.app
ADMIN_TOKEN=your_secure_admin_token
```

### 3. Configure Bot Settings
Edit `config.js`:
- Add your Telegram user ID to `adminIds`
- Set your channel/group links
- Customize bot messages

### 4. Run the Bot
```bash
npm start
```

---

## 🛤️ Deploy to Railway

### Method 1: One-Click Deploy
[![Deploy on Railway](https://railway.app/button.svg)](your-button-url)

### Method 2: CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Set environment variables
railway variables set BOT_TOKEN=your_token
railway variables set BASE_URL=https://your-app.up.railway.app
```

### Railway Environment Variables
| Variable | Description |
|----------|-------------|
| `BOT_TOKEN` | Your Telegram bot token |
| `BASE_URL` | Your Railway app URL |
| `ADMIN_TOKEN` | Admin panel access token |
| `PORT` | Server port (auto-set by Railway) |

---

## 📁 Project Structure

```
shadow-dev-bot/
├── bot/
│   ├── index.js          # Main bot logic
│   ├── server.js         # Express web server
│   └── deploy.js         # Deployment handler
├── utils/
│   ├── database.js       # JSON database system
│   ├── templates.js      # Template management
│   ├── template-engine.js # HTML/CSS/JS generator
│   ├── deployer.js       # Website deployment
│   └── helpers.js        # Utility functions
├── data/
│   ├── users.json        # User data
│   ├── websites.json     # Website records
│   ├── stats.json        # Bot statistics
│   ├── referrals.json    # Referral records
│   └── admin.json        # Admin settings
├── templates/
│   ├── categories/       # Template categories
│   ├── assets/           # Template assets
│   ├── previews/         # Preview images
│   └── index.json        # Template catalog
├── deployed/             # Deployed websites
├── admin-panel/
│   ├── server.js         # Admin API server
│   └── public/
│       └── index.html    # Admin dashboard
├── config.js             # Bot configuration
├── start.js              # Start script
├── package.json
├── .env.example
├── .gitignore
├── railway.json          # Railway config
├── nixpacks.toml         # Nixpacks config
├── Procfile
└── README.md
```

---

## 🤖 Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | Start the bot & verify joins |
| `/help` | Show help message |
| `/create` | Create a new website |
| `/mywebs` | View your websites |
| `/stats` | Your statistics |
| `/refer` | Get referral link |
| `/admin` | Admin panel (admins only) |

---

## 🔐 Admin Panel

### Telegram Admin
- Send `/admin` command
- View stats, users, websites
- Manage user limits
- Broadcast messages

### Web Admin Panel
```
URL: http://localhost:3001 or your-admin-url
Token: Your ADMIN_TOKEN from .env
```

**Features:**
- 📊 Live dashboard with statistics
- 👥 User management (view, ban, limit)
- 🌐 Website management
- 🎨 Template management (add/remove)
- 📢 Broadcast messaging
- ⚙️ Bot settings

---

## ⚙️ Configuration

### config.js Options
```javascript
bot: {
  token: "YOUR_BOT_TOKEN",      // Bot token
  username: "shadowdevbot",     // Bot username
  adminIds: [123456789],        // Admin Telegram IDs
},

channels: {
  channel1: { id, username, name, link, mandatory: true },
  channel2: { id, username, name, link, mandatory: true },
  group1:   { id, username, name, link, mandatory: true },
  group2:   { id, username, name, link, mandatory: true }
},

optionalChannels: {
  youtube: { name, link, mandatory: false },
  whatsapp: { name, link, mandatory: false }
},

limits: {
  dailyFreeLimit: 2,    // Free websites per day
  referralBonus: 1,     // Bonus per referral
  maxWebsitesPerUser: 100
}
```

---

## 🗄️ Database Structure

All data stored in JSON files (no database required):

### users.json
```json
{
  "userId": {
    "id": 123456,
    "username": "john",
    "joinedAt": "2024-01-01T00:00:00.000Z",
    "isVerified": true,
    "websitesToday": 0,
    "dailyLimit": 2,
    "totalWebsites": 5,
    "referrals": 3,
    "websites": [...]
  }
}
```

---

## 📝 Adding Custom Templates

### Via Admin Panel
1. Open admin panel
2. Go to Templates tab
3. Click "Add Template"
4. Fill in details

### Via Code
Edit `templates/index.json`:
```json
{
  "templates": [
    {
      "id": "shadow_custom_1",
      "name": "My Custom Template",
      "category": "Landing Pages",
      "categoryId": "landing-pages",
      "description": "Description here",
      "animations": ["fadeIn", "slideUp"],
      "customFields": ["name", "email", "title", "description", "color"]
    }
  ]
}
```

---

## 🌐 API Endpoints

### Public
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Landing page |
| `/health` | GET | Health check |
| `/deployed/:id` | GET | View deployed website |

### Admin (requires Bearer token)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/stats` | GET | Dashboard stats |
| `/api/admin/users` | GET | All users |
| `/api/admin/users/:id` | GET | User details |
| `/api/admin/users/:id/limit` | POST | Update limit |
| `/api/admin/users/:id/ban` | POST | Ban user |
| `/api/admin/websites` | GET | All websites |
| `/api/admin/templates` | GET | All templates |
| `/api/admin/templates` | POST | Add template |
| `/api/admin/templates/:id` | DELETE | Delete template |
| `/api/admin/broadcast` | POST | Send broadcast |
| `/api/admin/settings` | GET | Bot settings |

---

## 🛠️ Development

### Run in Development Mode
```bash
# With auto-restart
npm run dev

# Bot only
node bot/index.js

# Server only
node bot/server.js

# Admin panel only
node admin-panel/server.js
```

### Environment Variables for Development
```env
NODE_ENV=development
BOT_TOKEN=your_test_bot_token
BASE_URL=http://localhost:3000
ADMIN_TOKEN=dev-token-123
```

---

## 🐛 Troubleshooting

### Bot not responding?
- Check if `BOT_TOKEN` is correct
- Ensure bot is started with `/start`
- Check if user joined all required channels

### Websites not deploying?
- Check `BASE_URL` is set correctly
- Ensure `deployed/` directory exists and is writable
- Check server logs for errors

### Admin panel not loading?
- Verify `ADMIN_TOKEN` is set
- Check if admin port is not in use
- Ensure you're using correct Bearer token

### Railway deployment failed?
- Set all required environment variables
- Check `railway.json` configuration
- View Railway logs for errors

---

## 📄 License

MIT License - feel free to use and modify!

---

## 🙏 Credits

Built with ❤️ by Shadow Dev

- [Node.js](https://nodejs.org/)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [Express.js](https://expressjs.com/)

---

## 📞 Support

For support, join our [Telegram Support Group](https://t.me/shadowdevsupport) or contact admin.

---

**🌑 Shadow Dev Bot - Create stunning websites in seconds!**
