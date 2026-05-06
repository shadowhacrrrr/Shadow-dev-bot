/**
 * ============================================================
 * SHADOW DEV BOT - EXPRESS SERVER
 * ============================================================
 * Serves deployed websites and provides API endpoints
 * ============================================================
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const config = require('../config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve deployed websites
app.use('/deployed', express.static(path.join(__dirname, '..', 'deployed')));

// Serve template previews
app.use('/previews', express.static(path.join(__dirname, '..', 'templates', 'previews')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    bot: 'Shadow Dev Bot',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API: Get stats
app.get('/api/stats', (req, res) => {
  try {
    const db = require('../utils/database');
    const stats = db.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get all users (admin)
app.get('/api/users', (req, res) => {
  try {
    const db = require('../utils/database');
    const users = db.getAllUsers();
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get all websites
app.get('/api/websites', (req, res) => {
  try {
    const db = require('../utils/database');
    const websites = db.getAllWebsites();
    res.json({
      success: true,
      count: websites.length,
      data: websites
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get templates
app.get('/api/templates', (req, res) => {
  try {
    const templates = require('../utils/templates');
    const allTemplates = templates.getAllTemplates();
    res.json({
      success: true,
      count: allTemplates.length,
      data: allTemplates
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get template by ID
app.get('/api/templates/:id', (req, res) => {
  try {
    const templates = require('../utils/templates');
    const template = templates.getTemplateById(req.params.id);
    if (!template) {
      return res.status(404).json({ success: false, error: 'Template not found' });
    }
    res.json({ success: true, data: template });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get categories
app.get('/api/categories', (req, res) => {
  try {
    const templates = require('../utils/templates');
    const categories = templates.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get deployed website info
app.get('/api/website/:id', (req, res) => {
  try {
    const deployer = require('../utils/deployer');
    const websitePath = deployer.getDeployedPath(req.params.id);
    if (!websitePath) {
      return res.status(404).json({ success: false, error: 'Website not found' });
    }
    res.json({
      success: true,
      data: {
        id: req.params.id,
        url: `${config.deployment.baseUrl}/deployed/${req.params.id}`,
        path: websitePath
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve index.html for deployed websites (fallback)
app.get('/deployed/:id', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'deployed', req.params.id, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Website Not Found</title></head>
      <body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:Arial;background:#0a0a0a;color:#fff;">
        <div style="text-align:center;">
          <h1>🌑 Shadow Dev</h1>
          <p>Website not found or has been removed.</p>
          <a href="/" style="color:#6366f1;">Go Home</a>
        </div>
      </body>
      </html>
    `);
  }
});

// Default route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Shadow Dev Bot</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .container {
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .logo {
          font-size: 5rem;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }
        h1 {
          font-size: 3rem;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 15px;
        }
        p {
          color: #888;
          font-size: 1.2rem;
          margin-bottom: 30px;
        }
        .btn {
          display: inline-block;
          padding: 15px 40px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }
        .particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #6366f1;
          border-radius: 50%;
          animation: particle linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes particle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        .stats {
          display: flex;
          gap: 40px;
          justify-content: center;
          margin-top: 40px;
        }
        .stat {
          text-align: center;
        }
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #6366f1;
        }
        .stat-label {
          color: #888;
          font-size: 0.9rem;
        }
      </style>
    </head>
    <body>
      <div class="particles" id="particles"></div>
      <div class="container">
        <div class="logo">🌑</div>
        <h1>Shadow Dev Bot</h1>
        <p>Premium Website Builder & Deployer</p>
        <a href="https://t.me/${config.bot.username}" class="btn">Open in Telegram</a>
        <div class="stats">
          <div class="stat">
            <div class="stat-number">300+</div>
            <div class="stat-label">Templates</div>
          </div>
          <div class="stat">
            <div class="stat-number">0</div>
            <div class="stat-label">Users</div>
          </div>
          <div class="stat">
            <div class="stat-number">0</div>
            <div class="stat-label">Websites</div>
          </div>
        </div>
      </div>
      <script>
        // Create particles
        const container = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
          const p = document.createElement('div');
          p.className = 'particle';
          p.style.left = Math.random() * 100 + '%';
          p.style.animationDuration = (Math.random() * 10 + 5) + 's';
          p.style.animationDelay = Math.random() * 5 + 's';
          p.style.opacity = Math.random() * 0.5 + 0.1;
          container.appendChild(p);
        }
        
        // Update stats from API
        fetch('/api/stats')
          .then(r => r.json())
          .then(data => {
            if (data.success) {
              document.querySelectorAll('.stat-number')[1].textContent = data.data.totalUsers || 0;
              document.querySelectorAll('.stat-number')[2].textContent = data.data.totalWebsites || 0;
            }
          })
          .catch(() => {});
      </script>
    </body>
    </html>
  `);
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
