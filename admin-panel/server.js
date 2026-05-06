/**
 * ============================================================
 * SHADOW DEV BOT - ADMIN PANEL SERVER
 * ============================================================
 * Web-based admin panel for template management & live tracking
 * ============================================================
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const config = require('../config');
const db = require('../utils/database');
const templates = require('../utils/templates');
const deployer = require('../utils/deployer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Admin authentication middleware
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
  // Simple token check - in production use proper JWT
  if (token === process.env.ADMIN_TOKEN || token === 'shadow-admin-2024') {
    next();
  } else {
    res.status(401).json({ success: false, error: 'Unauthorized' });
  }
};

// API Routes

// Get dashboard stats
app.get('/api/admin/stats', adminAuth, (req, res) => {
  try {
    const stats = db.getStats();
    const templateCount = templates.getTemplateCount();
    const deployStats = deployer.getStats();
    
    res.json({
      success: true,
      data: {
        ...stats,
        totalTemplates: templateCount,
        deployedWebsites: deployStats.totalDeployed,
        storageUsed: deployStats.totalSize
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all users
app.get('/api/admin/users', adminAuth, (req, res) => {
  try {
    const allUsers = db.getAllUsers();
    res.json({
      success: true,
      count: allUsers.length,
      data: allUsers
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user by ID
app.get('/api/admin/users/:id', adminAuth, (req, res) => {
  try {
    const user = db.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user limit
app.post('/api/admin/users/:id/limit', adminAuth, (req, res) => {
  try {
    const { limit } = req.body;
    const result = db.setUserLimit(req.params.id, limit);
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ban user
app.post('/api/admin/users/:id/ban', adminAuth, (req, res) => {
  try {
    const result = db.banUser(req.params.id);
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Unban user
app.post('/api/admin/users/:id/unban', adminAuth, (req, res) => {
  try {
    const result = db.unbanUser(req.params.id);
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all websites
app.get('/api/admin/websites', adminAuth, (req, res) => {
  try {
    const allWebsites = db.getAllWebsites();
    res.json({
      success: true,
      count: allWebsites.length,
      data: allWebsites
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all templates
app.get('/api/admin/templates', adminAuth, (req, res) => {
  try {
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

// Add new template
app.post('/api/admin/templates', adminAuth, (req, res) => {
  try {
    const result = templates.addTemplate(req.body);
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete template
app.delete('/api/admin/templates/:id', adminAuth, (req, res) => {
  try {
    const result = templates.removeTemplate(req.params.id);
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Broadcast message (placeholder - requires bot instance)
app.post('/api/admin/broadcast', adminAuth, (req, res) => {
  try {
    const { message } = req.body;
    // This would require access to the bot instance
    // Implementation depends on how you want to handle broadcasting
    res.json({ success: true, message: 'Broadcast queued' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get bot settings
app.get('/api/admin/settings', adminAuth, (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        bot: config.bot,
        channels: config.channels,
        limits: config.limits,
        deployment: config.deployment
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve admin panel HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Admin panel error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start server
const PORT = process.env.ADMIN_PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔐 Admin Panel running on port ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});

module.exports = app;
